<?php

namespace App\Http\Controllers;

use App\Models\product;
use App\Models\Tender;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Termwind\Components\Dd;

class TenderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function AddAdminView(){
    $users=User::where('isadmin',0)->get();
    $adminlist=User::where('isadmin',1)->get();
    return Inertia::render('AddAdmin',['users'=>$users,'adminlist'=>$adminlist]);
}
public function AddAdminStore(Request $request){
    $user=User::find($request->admin);
    $user->isadmin=1;
    $user->save();
    return redirect()->route('admin.addview');
}
     public function TenderEditSubmit(Request $request)
     {
         $tender = Tender::find($request->id);
         $tender->beamangle = $request->beamangle;
         $tender->beamanglesecond = $request->beamanglesecond;
         $tender->beamanglethird = $request->beamanglethird;
         $tender->driver = $request->driver;
         $tender->driversecond = $request->driversecond;
         $tender->driverthird = $request->driverthird;
         $tender->colorconsistency = $request->colorconsistency;
         $tender->colorconsistencysecond = $request->colorconsistencysecond;
         $tender->colorconsistencythird = $request->colorconsistencythird;
         $tender->lamptype = $request->lamptype;
         $tender->lamptypesecond = $request->lamptypesecond;
         $tender->lamptypethird = $request->lamptypethird;
         $tender->uploaded_by = Auth::user()->email;
         $tender->company_name = $request->companyname;
         $tender->company_contact_person = $request->contactperson;
         $tender->company_email = $request->email;
         $tender->company_phone_number = $request->phonenumber;
         $tender->company_address = $request->address;
         $tender->company_city = $request->city;
         $tender->company_country = $request->country;
         $tender->company_state = $request->state;

         $tender->assignproductid = $request->assignproductid;
         $tender->brand = $request->brand;
         $tender->luminiare = $request->luminiare;
         $tender->category = $request->category;
         $tender->notes = $request->notes;
         $tender->temperature = $request->temperature;
         $tender->ipclass = $request->ipclass;
         $tender->cri = $request->cri;
         $tender->lumenoutput = $request->lumenoutput;
         $tender->lightsource = $request->lightsource;





         $tender->assignproductidsecond = $request->assignproductidsecond;
         $tender->brandsecond = $request->brandsecond;
         $tender->luminiaresecond = $request->luminiaresecond;
         $tender->categorysecond = $request->categorysecond;
         $tender->notessecond = $request->notessecond;
         $tender->temperaturesecond = $request->temperaturesecond;
         $tender->ipclasssecond = $request->ipclasssecond;
         $tender->crisecond = $request->crisecond;
         $tender->lumenoutputsecond = $request->lumenoutputsecond;
         $tender->lightsourcesecond = $request->lightsourcesecond;





         $tender->assignproductidthird = $request->assignproductidthird;
         $tender->brandthird = $request->brandthird;
         $tender->luminiarethird = $request->luminiarethird;
         $tender->categorythird = $request->categorythird;
         $tender->notesthird = $request->notesthird;
         $tender->temperaturethird = $request->temperaturethird;
         $tender->ipclassthird = $request->ipclassthird;
         $tender->crithird = $request->crithird;
         $tender->lumenoutputthird = $request->lumenoutputthird;
         $tender->lightsourcethird = $request->lightsourcethird;


         $tender->save();
        //  return redirect()->route('tender.index');
     }
    public function TenderEdit($id)
    {
        // tender whwre id = id
        $tender = Tender::find($id);


        // if tender uploaded_by is not equal to current user email then redirect to dashboard
        if ($tender->uploaded_by != Auth::user()->email) {
            return redirect()->route('dashboard');
        }

        $products = product::all();
        $product = product::where('id', $tender->assigned_product_id)->first();
        return Inertia::render('EditTender', [
            'tender' => $tender,
            'product' => $product,
            'products' => $products
        ]);
    }
    public function TenderDelete($id)
    {
        $tender = Tender::find($id);
        $tender->delete();
        return redirect()->route('tender.index');
    }
    public function ViewTender($id)
    {
        $tender = Tender::find($id);
        $products = product::all();
        $product = product::where('id', $tender->assigned_product_id)->first();
        return Inertia::render('ViewTender', [
            'tender' => $tender,
            'product' => $product,
            'products' => $products
        ]);
    }
    public function index()
    {
        $tender = Tender::all();
        // return view intertia tender
        return Inertia::render('Tender', [
            'tender' => $tender
        ]);
    }
    public function TenderStore(Request $request)
    {
        //  new tender
        $tender = new Tender();

        //    Check if photometric photo isset
        if ($request->file('photometricphoto') != null) {
            $request->validate([
                // Validate image
                'photometricphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $photometricPhoto = $request->file('photometricphoto');
            $tender->photometricphoto = 'public/photometricPhoto/' . date('YmdHis') . $photometricPhoto->getClientOriginalName();
            $photometricPhoto->storeAs('public/photometricPhoto', date('YmdHis') . $photometricPhoto->getClientOriginalName());
        } else
        // if photometric photo not exist
        {
            $tender->photometricphoto = $request->photometricphoto['path'];
        }

        // Check dimension photo isset
        if ($request->file('dimensionphoto') != null) {
            $request->validate([
                // Validate image
                'dimensionphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $dimensionPhoto = $request->file('dimensionphoto');
            $tender->dimensionphoto = 'public/dimensionPhoto/' . date('YmdHis') . $dimensionPhoto->getClientOriginalName();
            $dimensionPhoto->storeAs('public/dimensionPhoto', date('YmdHis') . $dimensionPhoto->getClientOriginalName());
        } else {
            $tender->dimensionphoto = $request->dimensionphoto['path'];
        }

        // Check main photo isset
        if ($request->file('mainphoto') != null) {

            $request->validate([
                // Validate image
                'mainphoto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $mainPhoto = $request->file('mainphoto');
            $tender->mainphoto = 'public/mainPhoto/' . date('YmdHis') . $mainPhoto->getClientOriginalName();
            $mainPhoto->storeAs('public/mainPhoto', date('YmdHis') . $mainPhoto->getClientOriginalName());
        } else {
            $tender->mainphoto = $request->mainphoto['path'];
        }
        // Check second photometric photo isset
        if ($request->file('photometricphotosecond') != null) {
            $request->validate([
                // Validate image
                'photometricphotosecond' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $photometricPhotoSecond = $request->file('photometricphotosecond');
            $tender->photometricphotosecond = 'public/photometricPhotoSecond/' . date('YmdHis') . $photometricPhotoSecond->getClientOriginalName();
            $photometricPhotoSecond->storeAs('public/photometricPhotoSecond', date('YmdHis') . $photometricPhotoSecond->getClientOriginalName());
        } else {
            $tender->photometricphotosecond = $request->photometricphotosecond['path'];
        }

        // Check second dimension photo isset
        if ($request->file('dimensionphotosecond') != null) {
            $request->validate([
                // Validate image
                'dimensionphotosecond' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $dimensionPhotoSecond = $request->file('dimensionphotosecond');
            $tender->dimensionphotosecond = 'public/dimensionPhoto/' . 'second' .  date('YmdHis') . $dimensionPhotoSecond->getClientOriginalName();
            $dimensionPhotoSecond->storeAs('public/dimensionPhoto/', 'second' . date('YmdHis') . $dimensionPhotoSecond->getClientOriginalName());
        } else {
            $tender->dimensionphotosecond = $request->dimensionphotosecond['path'];
        }

        // Check second main photo isset
        if ($request->file('mainphotosecond') != null) {
            $request->validate([
                // Validate image
                'mainphotosecond' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $mainPhotoSecond = $request->file('mainphotosecond');
            $tender->mainphotosecond = 'public/mainPhoto/' . 'second' . date('YmdHis') . $mainPhotoSecond->getClientOriginalName();
            $mainPhotoSecond->storeAs('public/mainPhoto/', 'second' . date('YmdHis') . $mainPhotoSecond->getClientOriginalName());
        } else {
            $tender->mainphotosecond = $request->mainphotosecond['path'];
        }
        // Check third photometric photo isset
        // dd($request->photometricphotothird);
        if ($request->file('photometricphotothird') != null) {
            $request->validate([
                // Validate image
                'photometricphotothird' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $photometricPhotoThird = $request->file('photometricphotothird');
            $tender->photometricphotothird = 'public/photometricPhoto/' . 'third' . date('YmdHis') . $photometricPhotoThird->getClientOriginalName();
            $photometricPhotoThird->storeAs('public/photometricPhoto', 'third' . date('YmdHis') . $photometricPhotoThird->getClientOriginalName());
        } else {
            $tender->photometricphotothird = $request->photometricphotothird['path'];
        }

        // Check third dimension photo isset
        if ($request->file('dimensionphotothird') != null) {
            $request->validate([
                // Validate image
                'dimensionphotothird' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $dimensionPhotoThird = $request->file('dimensionphotothird');
            $tender->dimensionphotothird = 'public/dimensionPhoto/' . 'third' . date('YmdHis') . $dimensionPhotoThird->getClientOriginalName();
            $dimensionPhotoThird->storeAs('public/dimensionPhoto', 'third' . date('YmdHis') . $dimensionPhotoThird->getClientOriginalName());
        } else {
            $tender->dimensionphotothird = $request->dimensionphotothird['path'];
        }

        // Check third main photo isset
        if ($request->file('mainphotothird') != null) {
            $request->validate([
                // Validate image
                'mainphotothird' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $mainPhotoThird = $request->file('mainphotothird');
            $tender->mainphotothird = 'public/mainPhoto/' . 'third' . date('YmdHis') . $mainPhotoThird->getClientOriginalName();
            $mainPhotoThird->storeAs('public/mainPhoto', 'third' . date('YmdHis') . $mainPhotoThird->getClientOriginalName());
        } else {
            $tender->mainphotothird = $request->mainphotothird['path'];
        }
        $tender->beamangle = $request->beamangle;
        $tender->beamanglesecond = $request->beamanglesecond;
        $tender->beamanglethird = $request->beamanglethird;
        $tender->driver = $request->driver;
        $tender->driversecond = $request->driversecond;
        $tender->driverthird = $request->driverthird;
        $tender->colorconsistency = $request->colorconsistency;
        $tender->colorconsistencysecond = $request->colorconsistencysecond;
        $tender->colorconsistencythird = $request->colorconsistencythird;
        $tender->lamptype = $request->lamptype;
        $tender->lamptypesecond = $request->lamptypesecond;
        $tender->lamptypethird = $request->lamptypethird;
        $tender->uploaded_by = Auth::user()->email;
        $tender->company_name = $request->companyname;
        $tender->company_contact_person = $request->contactperson;
        $tender->company_email = $request->email;
        $tender->company_phone_number = $request->phonenumber;
        $tender->company_address = $request->address;
        $tender->company_city = $request->city;
        $tender->company_country = $request->country;
        $tender->company_state = $request->state;

        $tender->assignproductid = $request->assignproductid;
        $tender->brand = $request->brand;
        $tender->luminiare = $request->luminiare;
        $tender->category = $request->category;
        $tender->notes = $request->notes;
        $tender->temperature = $request->temperature;
        $tender->ipclass = $request->ipclass;
        $tender->cri = $request->cri;
        $tender->lumenoutput = $request->lumenoutput;
        $tender->lightsource = $request->lightsource;





        $tender->assignproductidsecond = $request->assignproductidsecond;
        $tender->brandsecond = $request->brandsecond;
        $tender->luminiaresecond = $request->luminiaresecond;
        $tender->categorysecond = $request->categorysecond;
        $tender->notessecond = $request->notessecond;
        $tender->temperaturesecond = $request->temperaturesecond;
        $tender->ipclasssecond = $request->ipclasssecond;
        $tender->crisecond = $request->crisecond;
        $tender->lumenoutputsecond = $request->lumenoutputsecond;
        $tender->lightsourcesecond = $request->lightsourcesecond;





        $tender->assignproductidthird = $request->assignproductidthird;
        $tender->brandthird = $request->brandthird;
        $tender->luminiarethird = $request->luminiarethird;
        $tender->categorythird = $request->categorythird;
        $tender->notesthird = $request->notesthird;
        $tender->temperaturethird = $request->temperaturethird;
        $tender->ipclassthird = $request->ipclassthird;
        $tender->crithird = $request->crithird;
        $tender->lumenoutputthird = $request->lumenoutputthird;
        $tender->lightsourcethird = $request->lightsourcethird;


        $tender->save();
        return redirect()->route('tender.index')->with('success', 'Tender added successfully');
    }
    public function AddTenderView()
    {
        $product = product::all();
        return Inertia::render('AddTender', [
            'product' => $product
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tender  $tender
     * @return \Illuminate\Http\Response
     */
    public function show(Tender $tender)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tender  $tender
     * @return \Illuminate\Http\Response
     */
    public function edit(Tender $tender)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tender  $tender
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tender $tender)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tender  $tender
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tender $tender)
    {
        //
    }
}
