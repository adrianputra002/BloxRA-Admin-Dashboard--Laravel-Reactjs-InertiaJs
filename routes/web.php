<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TenderController;
use App\Models\ProductCategory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/dashboard', function () {
    $productCountByCategory = DB::table('products')
        ->select(DB::raw('count(*) as count, product_categories.category_name'))
        ->leftJoin('product_categories', 'category_name', '=', 'products.product_category')
        ->groupBy('product_categories.category_name')
        ->get();
    return Inertia::render('Dashboard', [
        'productCountByCategory' => $productCountByCategory
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        $productCountByCategory = DB::table('products')
            ->select(DB::raw('count(*) as count, product_categories.category_name'))
            ->leftJoin('product_categories', 'category_name', '=', 'products.product_category')
            ->groupBy('product_categories.category_name')
            ->get();
        return Inertia::render('Dashboard', [
            'productCountByCategory' => $productCountByCategory
        ]);
    });
    Route::get('/addbyexcel', [ProductController::class, 'AddByExcel'])->name('product.addbyexcel');
    Route::post('/addbyexcel', [ProductController::class, 'AddByExcelStore'])->name('product.addbyexcelstore');
    Route::get('/products', [ProductController::class, 'index'])->name('product.index');
    Route::get('/tender', [TenderController::class, 'index'])->name('tender.index');
    Route::get('/addtender', [TenderController::class, 'AddTenderView'])->name('tender.addview');
    Route::get('/deleteproduct/{token}', [ProductController::class, 'DeleteProduct'])->name('product.delete');
    Route::get('/product/{category}', [ProductController::class, 'ProductList'])->name('product.list');
    Route::get('/myproduct', [ProductController::class, 'MyProductList'])->name('product.myproducts');
    Route::get('/addproduct', [ProductController::class, 'AddProductView'])->name('product.addproductview');
    Route::get('/productedit/{token}', [ProductController::class, 'EditProduct'])->name('product.editproduct');
    Route::get('/tenderview/{id}', [TenderController::class, 'ViewTender'])->name('tender.view');
    Route::post('/productedit', [ProductController::class, 'EditProductSubmit'])->name('product.editsubmit');
    Route::post('/tenderaddstore', [TenderController::class, 'TenderStore'])->name('tender.add');
    Route::post('/tendereditsubmit', [TenderController::class, 'TenderEditSubmit'])->name('tender.editsubmit');
    Route::post('/deletetender/{id}', [TenderController::class, 'TenderDelete'])->name('tender.delete');

    Route::get('/tenderedit/{id}', [TenderController::class, 'TenderEdit'])->name('tender.edit');
    Route::get('/exportpdf/{token}', [ProductController::class, 'ExportPDF'])->name('product.ExportPDF');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/exceltemplate', [ProductController::class, 'DownloadExcelTemplate'])->name('product.template');
    Route::get('/productview/{token}', [ProductController::class, 'ViewProduct'])->name('product.view');
    Route::post('/storeproduct', [ProductController::class, 'store'])->name('product.add');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('isAdmin')->group(function () {
        Route::get('/admin', [ProductController::class, 'AdminView'])->name('product.admin');
        Route::get('/productcategorydelete/{id}', [ProductController::class, 'DeleteCategory'])->name('category.delete');
        Route::post('/addproductcategory', [ProductCategoryController::class, 'AddCategory'])->name('category.add');
        Route::post('/addadmin', [TenderController::class, 'AddAdminStore'])->name('admin.addstore');
        Route::get('/addadmin', [TenderController::class, 'AddAdminView'])->name('admin.addview');
        Route::get('/addproductcategory', [ProductCategoryController::class, 'AddCategoryView'])->name('category.addcategoryview');
        Route::get('/addbrand', [BrandController::class, 'AddBrandView'])->name('brand.addbrandview');
        Route::get('/branddelete/{id}', [BrandController::class, 'DeleteBrand'])->name('brand.deletebrand');
        Route::post("/addbrand", [BrandController::class, 'AddBrand'])->name('brand.add');
    });
});

require __DIR__ . '/auth.php';
