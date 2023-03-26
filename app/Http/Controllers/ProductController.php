<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\product;
use App\Models\ProductCategory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use PDF;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function DeleteCategory($id){
        $category = ProductCategory::find($id);
        $category->delete();
        return redirect()->back()->with('status', 'Category deleted successfully');
     }
    public function ViewProduct($token)
    {
        // Get product where token = token
        $product = product::where('token', $token)->first();

        return Inertia::render('ViewProduct', [
            'product' => $product,
            'mainphoto' => asset(Storage::url($product->product_img_main_photo_path)),
            'photometricphoto' => asset(Storage::url($product->product_img_photometric_photo_path)),
            'accessoriesphoto' => asset(Storage::url($product->product_img_accessories_photo_path)),
            'dimensionphoto' => asset(Storage::url($product->product_img_dimension_photo_path)),
        ]);
    }
    public function DeleteProduct($token)
    {
        // Get product where token = token
        $product = product::where('token', $token)->first();
        // Delete product
        $product->delete();
        //redirect back with session status

        return redirect()->back()->with('status', 'Product deleted successfully');
    }
    public function ExportPDF($token)
    {
        $product = product::where('token', $token)->first();
        // explode product->product_img_main_photo_path the public/
        $mainphotopath = explode('public/', $product->product_img_main_photo_path);
        $photometricphotopath = explode('public/', $product->product_img_photometric_photo_path);
        $accessoriesphotopath = explode('public/', $product->product_img_accessories_photo_path);
        $dimensionphotopath = explode('public/', $product->product_img_dimension_photo_path);

        $pdf = PDF::loadView('productpdf', [
            'product' => $product,
            'mainphoto' => asset(Storage::url($mainphotopath[1])),
            'photometricphoto' => asset(Storage::url($photometricphotopath[1])),
            'accessoriesphoto' => asset(Storage::url($accessoriesphotopath[1])),
            'dimensionphoto' => asset(Storage::url($dimensionphotopath[1])),
        ]);
        return $pdf->download('product.pdf');
    }
    public function EditProduct($token)
    {
        // Get from table product where token=token
        $product = product::where('token', $token)->first();
        return Inertia::render('EditProduct', [
            'product' => $product,
            'mainphoto' => asset(Storage::url($product->product_img_main_photo_path)),
            'photometricphoto' => asset(Storage::url($product->product_img_photometric_photo_path)),
            'accessoriesphoto' => asset(Storage::url($product->product_img_accessories_photo_path)),
            'dimensionphoto' => asset(Storage::url($product->product_img_dimension_photo_path)),
        ]);
    }

    public function MyProductList(){
        $product=product::where('uploaded_by',auth()->user()->email)->get();
        return Inertia::render('ProductList',[
            'product'=>$product
        ]);
    }
    public function ProductList($category)
    {
        //explode first word from category
        $categoryexploded = explode(' ', $category)[0];
        //  Get product where category = category and category similar to categoryexploded
        $product = product::where('product_category', $category)->orWhere('product_category', 'like', '%' . $categoryexploded . '%')->get();
        return Inertia::render('ProductList', [
            'product' => $product,
        ]);
    }
    public function AddByExcelStore(Request $request)
    {
        $request->validate([
            // Validate only excel file
            'excelfile' => 'required|mimes:xls,xlsx',
            'photometricphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'accessoriesphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'dimensionphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'mainphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // File declaration
        $mainPhoto = $request->file('mainphoto');
        $photometricPhoto = $request->file('photometricphoto');
        $accessoriesPhoto = $request->file('accessoriesphoto');
        $dimensionPhoto = $request->file('dimensionphoto');

        // Get excel file
        $file = $request->file('excelfile');

        // Get file name
        $fileName = $file->getClientOriginalName();
        // Store file as currentdate+time+originalname + file extension in public/excel
        $file->storeAs('public/excel', date('YmdHis') . $file->getClientOriginalName());
        // Get uploaded path string
        $filePath = storage_path('../public/public/excel/' . date('YmdHis') . $file->getClientOriginalName());
        // import excel file

        $importExcel = Excel::import(new product, request()->file('excelfile'));
        // Read from shet dl1

        $importExcelDataDL1 = Excel::toArray(new product, $filePath)[0];
        // Get first img from excel

        $insertProduct = new product;

        $insertProduct->uploaded_by = auth()->user()->email;
        $token = substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(10 / strlen($x)))), 1, 10);
        $insertProduct->token = $token;
        $insertProduct->product_category = $importExcelDataDL1[9][2];
        $insertProduct->product_brand = $importExcelDataDL1[32][7];
        $insertProduct->product_luminiare_type = $importExcelDataDL1[12][7];
        $insertProduct->product_model = $importExcelDataDL1[34][7];
        $insertProduct->product_color_temperature = $importExcelDataDL1[20][7];
        $insertProduct->product_ip_class = $importExcelDataDL1[30][7];
        $insertProduct->product_cri = $importExcelDataDL1[22][7];
        $insertProduct->product_lumen_output = $importExcelDataDL1[16][7];
        $insertProduct->product_light_source = $importExcelDataDL1[14][7];
        $insertProduct->product_beam_angle = $importExcelDataDL1[18][7];
        $insertProduct->product_color_consistency = $importExcelDataDL1[24][7];
        $insertProduct->product_lamp_type = $importExcelDataDL1[14][9];
        $insertProduct->product_driver = $importExcelDataDL1[37][7];
        $insertProduct->product_content = $importExcelDataDL1[26][0];

        // img store handler
        $photometricPhoto->storeAs('public/photometricPhoto', date('YmdHis') . $photometricPhoto->getClientOriginalName());
        // Store accessories photo as currentdate+time+originalname + file extension in public/accessoriesPhoto
        $accessoriesPhoto->storeAs('public/accessoriesPhoto', date('YmdHis') . $accessoriesPhoto->getClientOriginalName());
        // Store dimension photo as currentdate+time+originalname + file extension in public/dimensionPhoto
        $dimensionPhoto->storeAs('public/dimensionPhoto', date('YmdHis') . $dimensionPhoto->getClientOriginalName());
        // Store main photo as currentdate+time+originalname + file extension in public/mainPhoto
        $mainPhoto->storeAs('public/mainPhoto', date('YmdHis') . $mainPhoto->getClientOriginalName());


        $insertProduct->product_img_main_photo_path = 'public/mainPhoto/' . date('YmdHis') . $mainPhoto->getClientOriginalName();
        $insertProduct->product_img_main_photo_size = $mainPhoto->getSize();
        $insertProduct->product_img_main_photo_name = $mainPhoto->getClientOriginalName();
        $insertProduct->product_img_dimension_photo_path = 'public/dimensionPhoto/' . date('YmdHis') . $dimensionPhoto->getClientOriginalName();
        $insertProduct->product_img_dimension_photo_size = $dimensionPhoto->getSize();
        $insertProduct->product_img_dimension_photo_name = $dimensionPhoto->getClientOriginalName();
        $insertProduct->product_img_accessories_photo_path = 'public/accessoriesPhoto/' . date('YmdHis') . $accessoriesPhoto->getClientOriginalName();
        $insertProduct->product_img_accessories_photo_size = $accessoriesPhoto->getSize();
        $insertProduct->product_img_accessories_photo_name = $accessoriesPhoto->getClientOriginalName();
        $insertProduct->product_img_photometric_photo_path = 'public/photometricPhoto/' . date('YmdHis') . $photometricPhoto->getClientOriginalName();
        $insertProduct->product_img_photometric_photo_name = $photometricPhoto->getClientOriginalName();
        $insertProduct->product_img_photometric_photo_size = $photometricPhoto->getSize();
        $insertProduct->product_img_photometric_photo_path = 'public/photometricPhoto/' . date('YmdHis') . $photometricPhoto->getClientOriginalName();
        $insertProduct->save();
        return redirect()->route('product.index')->with('status', 'Product Imported From Excel Successfully');
    }

    public function AddProductView()
    {
        $categories=ProductCategory::all();
        $brand=Brand::all();
        return Inertia::render('AddProduct'
        ,[
            'categories'=>$categories,
            'brand'=>$brand
        ]);
    }
    public function AddByExcel()
    {
        return Inertia::render('AddbyExcel');
    }
    public function index()
    {
        $productCategories = ProductCategory::all();

        return  Inertia::render('Products', [
            'productCategories' => $productCategories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'photometricphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'accessoriesphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'dimensionphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'mainphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);



        $mainPhoto = $request->file('mainphoto');
        $photometricPhoto = $request->file('photometricphoto');
        $accessoriesPhoto = $request->file('accessoriesphoto');
        $dimensionPhoto = $request->file('dimensionphoto');
        // get photometric photo file name
        $photometricphotoName = $photometricPhoto->getClientOriginalName();
        // Store photometric photo as currentdate+time+originalname + file extension in public/photometricPhoto
        $photometricPhoto->storeAs('public/photometricPhoto', date('YmdHis') . $photometricPhoto->getClientOriginalName());
        // Store accessories photo as currentdate+time+originalname + file extension in public/accessoriesPhoto
        $accessoriesPhoto->storeAs('public/accessoriesPhoto', date('YmdHis') . $accessoriesPhoto->getClientOriginalName());
        // Store dimension photo as currentdate+time+originalname + file extension in public/dimensionPhoto
        $dimensionPhoto->storeAs('public/dimensionPhoto', date('YmdHis') . $dimensionPhoto->getClientOriginalName());
        // Store main photo as currentdate+time+originalname + file extension in public/mainPhoto
        $mainPhoto->storeAs('public/mainPhoto', date('YmdHis') . $mainPhoto->getClientOriginalName());
        // Store product data in database
        $product = new product;
        $product->product_category = $request->category;
        $product->product_brand = $request->brand;
        $product->product_luminiare_type = $request->luminiare;
        $product->product_model = $request->model;
        $product->product_color_temperature = $request->temperature;
        $product->product_ip_class = $request->ipclass;
        $product->product_cri = $request->cri;
        $product->product_lumen_output = $request->lumenoutput;
        $product->product_light_source = $request->lightsource;
        $product->product_beam_angle = $request->beamangle;
        $product->product_driver = $request->driver;
        $product->product_color_consistency = $request->colorconsistency;
        $product->product_lamp_type = $request->lamptype;
        $product->product_content = $request->productcontent;
        $product->product_img_main_photo_path = 'public/mainPhoto/' . date('YmdHis') . $mainPhoto->getClientOriginalName();
        $product->product_img_main_photo_size = $mainPhoto->getSize();
        $product->product_img_main_photo_name = $mainPhoto->getClientOriginalName();
        $product->product_img_dimension_photo_path = 'public/dimensionPhoto/' . date('YmdHis') . $dimensionPhoto->getClientOriginalName();
        $product->product_img_dimension_photo_size = $dimensionPhoto->getSize();
        $product->product_img_dimension_photo_name = $dimensionPhoto->getClientOriginalName();
        $product->product_img_accessories_photo_path = 'public/accessoriesPhoto/' . date('YmdHis') . $accessoriesPhoto->getClientOriginalName();
        $product->product_img_accessories_photo_size = $accessoriesPhoto->getSize();
        $product->product_img_accessories_photo_name = $accessoriesPhoto->getClientOriginalName();
        $product->product_img_photometric_photo_path = 'public/photometricPhoto/' . date('YmdHis') . $photometricPhoto->getClientOriginalName();
        $product->product_img_photometric_photo_name = $photometricPhoto->getClientOriginalName();
        $product->product_img_photometric_photo_size = $photometricPhoto->getSize();
        $product->product_img_photometric_photo_path = 'public/photometricPhoto/' . date('YmdHis') . $photometricPhoto->getClientOriginalName();
        // Random string for token
        $token = substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(10 / strlen($x)))), 1, 10);
        $product->token = $token;
        $product->uploaded_by = auth()->user()->email;
        $product->save();
        return redirect()->route('product.index')->with('status', 'Product Added Successfully');
    }
    public function EditProductSubmit(Request $request)
    {

        //submit edited data
        // find product whre product token = token
        $product = product::where('token', $request->token)->first();

        $product->product_category = $request->category;
        $product->product_brand = $request->brand;
        $product->product_luminiare_type = $request->luminiare;
        $product->product_model = $request->model;
        $product->product_color_temperature = $request->temperature;
        $product->product_ip_class = $request->ipclass;
        $product->product_cri = $request->cri;
        $product->product_lumen_output = $request->lumenoutput;
        $product->product_light_source = $request->lightsource;
        $product->product_beam_angle = $request->beamangle;
        $product->product_driver = $request->driver;
        $product->product_color_consistency = $request->colorconsistency;
        $product->product_lamp_type = $request->lamptype;
        $product->product_content = $request->productcontent;
        $product->save();
        return redirect()->route('product.index')->with('status', 'Product Edited Successfully');
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(product $product)
    {
        //
    }
    public function AdminView()
    {
        return  Inertia::render('Admin');
    }
    public function DownloadExcelTemplate()
    {
        // get storage path for excel template

        // $path= storage_path('app/public/exceltemplate/template.xlsx');
        // if(Storage::exists($path)){
        //     return response()->download($path);
        // }
        // else{
        //     return redirect()->route('product.index')->with('status', 'File Not Found');
        // }
        $publicpath = storage_path('app/public/exceltemplate/template.xlsx');

        // return publicpath file size
        return response()->download($publicpath);
    }
}
