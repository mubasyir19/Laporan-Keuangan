<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_the_login_page_uses_the_auth_login_inertia_component(): void
    {
        $this->get(route('login'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Auth/Login'));
    }

    public function test_the_initial_page_data_is_rendered_for_the_inertia_v3_client(): void
    {
        $this->get(route('login'))
            ->assertOk()
            ->assertSee('<script data-page="app" type="application/json">', false);
    }
}
