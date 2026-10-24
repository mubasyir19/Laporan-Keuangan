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
        Schema::table('accounts', function (Blueprint $table) {
            $table->unique(['foundation_id', 'id']);
        });

        Schema::table('accounting_periods', function (Blueprint $table) {
            $table->unique(['foundation_id', 'id']);
        });

        Schema::create('account_opening_balances', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('foundation_id');
            $table->uuid('accounting_period_id');
            $table->uuid('account_id');
            $table->decimal('debit_amount', 15, 2)->default(0);
            $table->decimal('credit_amount', 15, 2)->default(0);
            $table->timestamps();

            $table->unique(['accounting_period_id', 'account_id'], 'aob_period_account_unique');
            $table->index(['foundation_id', 'account_id'], 'aob_foundation_account_index');
            $table->index(['foundation_id', 'accounting_period_id'], 'aob_foundation_period_index');

            $table->foreign(['foundation_id', 'account_id'], 'aob_foundation_account_foreign')
                ->references(['foundation_id', 'id'])
                ->on('accounts')
                ->cascadeOnDelete();

            $table->foreign(['foundation_id', 'accounting_period_id'], 'aob_foundation_period_foreign')
                ->references(['foundation_id', 'id'])
                ->on('accounting_periods')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_opening_balances');

        Schema::table('accounting_periods', function (Blueprint $table) {
            $table->dropUnique(['foundation_id', 'id']);
        });

        Schema::table('accounts', function (Blueprint $table) {
            $table->dropUnique(['foundation_id', 'id']);
        });
    }
};
