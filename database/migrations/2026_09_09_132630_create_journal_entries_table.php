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
        Schema::create('journal_entries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('foundation_id')->constrained('foundations')->onDelete('cascade');
            $table->string('entry_number', 100);
            $table->date('entry_date');
            $table->text('description')->nullable();
            $table->enum('status', ['draft', 'posted', 'void'])->default('posted');
            $table->foreignUuid('created_by')->constrained('users');
            $table->timestamps();

            $table->unique(['foundation_id', 'entry_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_entries');
    }
};
