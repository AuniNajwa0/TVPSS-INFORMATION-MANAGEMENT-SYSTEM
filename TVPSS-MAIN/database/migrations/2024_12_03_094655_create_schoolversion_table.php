<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schoolversion', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('school_info_id');
            $table->string('version')->nullable();
            $table->string('agency1_name')->nullable();
            $table->string('agency2_name')->nullable();
            $table->string('agencyManager1_name')->nullable();
            $table->string('agencyManager2_name')->nullable();
            $table->enum('recordEquipment', ['Ada', 'Tiada']);
            $table->enum('greenScreen', ['Ada', 'Tiada']);
            $table->timestamps();

            $table->foreign('school_info_id')->references('id')->on('schoolinfo')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schoolversion');
    }
};
