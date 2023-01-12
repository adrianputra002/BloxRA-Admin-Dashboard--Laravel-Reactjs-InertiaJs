<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tenders', function (Blueprint $table) {
            $table->id();
            $table->string("uploaded_by");
            $table->string('company_name');
            $table->string('company_contact_person');
            $table->string('company_email');
            $table->string('company_phone_number');
            $table->string('company_address');
            $table->string('company_country');
            $table->string('company_city');
            $table->string('company_state');
            $table->string('brand');
            $table->string('category');

            $table->string('assignproductid')->nullable();
            $table->string('notes');
            $table->string('temperature');
            $table->string('ipclass');
            $table->string('luminiare');
            $table->string('cri');
            $table->string('lumenoutput');
            $table->string('lightsource');
            $table->string('dimensionphoto');
            $table->string('photometricphoto');
            $table->string('mainphoto');
            $table->string('beamangle');
            $table->string('driver');
            $table->string('colorconsistency');
            $table->string('lamptype');
            $table->string('categorysecond');
            $table->string('assignproductidsecond')->nullable();
            $table->string('notessecond');
            $table->string('luminiaresecond');
            $table->string('brandsecond');

            $table->string('temperaturesecond');
            $table->string('ipclasssecond');
            $table->string('crisecond');
            $table->string('lumenoutputsecond');
            $table->string('lightsourcesecond');
            $table->string('dimensionphotosecond');
            $table->string('photometricphotosecond');
            $table->string('mainphotosecond');
            $table->string('beamanglesecond');
            $table->string('driversecond');
            $table->string('colorconsistencysecond');
            $table->string('lamptypesecond');
            $table->string('categorythird');
            $table->string('assignproductidthird')->nullable();
            $table->string('notesthird');
            $table->string('temperaturethird');
            $table->string('ipclassthird');
            $table->string('luminiarethird');
            $table->string('brandthird');
            $table->string('crithird');
            $table->string('lumenoutputthird');
            $table->string('lightsourcethird');
            $table->string('dimensionphotothird');
            $table->string('photometricphotothird');
            $table->string('mainphotothird');
            $table->string('beamanglethird');
            $table->string('driverthird');
            $table->string('colorconsistencythird');
            $table->string('lamptypethird');


















            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tenders');
    }
};
