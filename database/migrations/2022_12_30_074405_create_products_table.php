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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("token")->nullable();
            $table->string("uploaded_by")->nullable();
            $table->string("product_category")->nullable();
            $table->string("product_brand")->nullable();
            $table->string("product_luminiare_type")->nullable();
            $table->string("product_model")->nullable();
            $table->string("product_color_temperature")->nullable();
            $table->string("product_ip_class")->nullable();
            $table->string("product_cri")->nullable();
            $table->string("product_lumen_output")->nullable();
            $table->string("product_light_source")->nullable();
            $table->string("product_beam_angle")->nullable();
            $table->string("product_color_consistency")->nullable();
            $table->string("product_lamp_type")->nullable();
            $table->string("product_driver")->nullable();
            $table->string("product_img_main_photo_path");
            $table->string("product_img_main_photo_size");
            $table->string("product_img_main_photo_name");
            $table->string("product_img_dimension_photo_path");
            $table->string("product_img_dimension_photo_size");
            $table->string("product_img_dimension_photo_name");
            $table->string("product_img_photometric_photo_path");
            $table->string("product_img_photometric_photo_size");
            $table->string("product_img_photometric_photo_name");
            $table->string("product_img_accessories_photo_path");
            $table->string("product_img_accessories_photo_size");
            $table->string("product_img_accessories_photo_name");
            $table->longText("product_content");
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
        Schema::dropIfExists('products');
    }
};
