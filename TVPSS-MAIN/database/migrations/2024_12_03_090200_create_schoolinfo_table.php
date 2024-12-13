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
        Schema::create('schoolinfo', function (Blueprint $table) {
            $table->id();
            $table->string('schoolCode');
            $table->string('schoolName');
            $table->string('schoolEmail');
            $table->string('schoolAddress1');
            $table->string('schoolAddress2')->nullable();
            $table->string('postcode');
            $table->string('state');
            $table->string('noPhone');
            $table->string('noFax')->nullable();
            $table->string('schoolLogo')->nullable();
            $table->string('linkYoutube')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_info');
    }
};
