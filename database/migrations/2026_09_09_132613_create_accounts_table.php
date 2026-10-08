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
        Schema::create('accounts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('foundation_id')->constrained('foundations')->onDelete('cascade');
            $table->string('code', 50);
            $table->string('name', 255);
            $table->enum('type', ['asset', 'liability', 'equity', 'revenue', 'expense']);
            $table->string('sub_type', 100);
            $table->enum('report_pos', ['NRC', 'LPR'])->default('NRC');
            $table->foreignUuid('parent_id')->nullable()->constrained('accounts')->onDelete('cascade');
            $table->enum('normal_balance', ['Db', 'Kr']);
            $table->decimal('saldo_awal_debit', 15, 2)->default(0);
            $table->decimal('saldo_awal_kredit', 15, 2)->default(0);
            $table->date('end_date')->nullable();
            $table->timestamps();

            $table->unique(['foundation_id', 'code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
