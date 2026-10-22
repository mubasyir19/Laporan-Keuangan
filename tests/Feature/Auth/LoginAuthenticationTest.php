<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_empty_credentials_return_validation_errors(): void
    {
        $this->post('/login', [])
            ->assertSessionHasErrors(['email', 'password']);
    }

    public function test_invalid_email_format_returns_validation_error(): void
    {
        $this->post('/login', [
            'email' => 'not-an-email',
            'password' => 'some-password',
        ])
            ->assertSessionHasErrors('email');
    }

    public function test_invalid_credentials_are_rejected(): void
    {
        $this->post('/login', [
            'email' => 'user@example.com',
            'password' => 'incorrect-password',
        ])
            ->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_valid_credentials_authenticate_and_redirect_to_dashboard(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'correct-password',
        ]);

        $this->post('/login', [
            'email' => 'user@example.com',
            'password' => 'correct-password',
        ])
            ->assertRedirect('/dashboard');

        $this->assertAuthenticatedAs($user);
    }
}
