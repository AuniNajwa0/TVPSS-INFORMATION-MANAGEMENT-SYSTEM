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
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('equipName'); 
            $table->string('equipType');
            $table->string('location'); 
            //$table->date('acquired_date'); 
            $table->date('acquired_date')->change();
            $table->enum('status', ['Berfungsi', 'Tidak Berfungsi', 'Penyelenggaraan']); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
