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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('ic_num')->unique();
            $table->string('email')->unique();
            $table->string('crew')->nullable(); 
            $table->string('state');
            $table->string('district');
            $table->string('schoolName');
            $table->unsignedBigInteger('school_info_id');
            $table->timestamps();
            $table->foreign('school_info_id')->references('id')->on('schoolinfo')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
