<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Lembaga;
use App\Models\PpdbInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfoPPDBController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/InfoPPDB/Index', [
            'ppdbInfos' => PpdbInfo::with('lembaga')->get(),
            'lembagas' => Lembaga::all(),
            'faqs' => Faq::with('lembaga')->orderBy('order', 'asc')->get(),
            'settings' => \App\Models\LandingSetting::where('group', 'ppdb')->get()->pluck('value', 'key'),
        ]);
    }

    public function storeInfo(Request $request)
    {
        $validated = $request->validate([
            'lembaga_id' => 'required|exists:lembagas,id',
            'description' => 'nullable|string',
            'contact_number' => 'nullable|string|max:255',
            'contact_persons' => 'nullable|array',
            'contact_persons.*.name' => 'required|string|max:100',
            'contact_persons.*.number' => 'required|string|max:30',
            'registration_link' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
            'is_open' => 'required|boolean',
            'is_link_active' => 'required|boolean',
        ]);

        PpdbInfo::updateOrCreate(
            ['lembaga_id' => $validated['lembaga_id']],
            $validated
        );

        return back()->with('success', 'Informasi PPDB berhasil diperbarui.');
    }

    public function updateInfo(Request $request, PpdbInfo $ppdbInfo)
    {
        $validated = $request->validate([
            'description' => 'nullable|string',
            'contact_number' => 'nullable|string|max:255',
            'contact_persons' => 'nullable|array',
            'contact_persons.*.name' => 'required|string|max:100',
            'contact_persons.*.number' => 'required|string|max:30',
            'registration_link' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
            'is_open' => 'required|boolean',
            'is_link_active' => 'required|boolean',
        ]);

        $ppdbInfo->update($validated);

        return back()->with('success', 'Informasi PPDB berhasil diperbarui.');
    }

    public function storeFaq(Request $request)
    {
        $validated = $request->validate([
            'lembaga_id' => 'nullable|exists:lembagas,id',
            'question' => 'required|string',
            'answer' => 'required|string',
            'order' => 'nullable|integer',
            'is_active' => 'required|boolean',
        ]);

        Faq::create($validated);

        return back()->with('success', 'FAQ berhasil ditambahkan.');
    }

    public function updateFaq(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'lembaga_id' => 'nullable|exists:lembagas,id',
            'question' => 'required|string',
            'answer' => 'required|string',
            'order' => 'nullable|integer',
            'is_active' => 'required|boolean',
        ]);

        $faq->update($validated);

        return back()->with('success', 'FAQ berhasil diperbarui.');
    }

    public function destroyFaq(Faq $faq)
    {
        $faq->delete();

        return back()->with('success', 'FAQ berhasil dihapus.');
    }
}

