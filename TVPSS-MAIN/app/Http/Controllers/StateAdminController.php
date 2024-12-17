<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CertificateTemplate;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class StateAdminController extends Controller
{
    public function certList()
    {
        $templates = CertificateTemplate::all();

        return Inertia::render('2-StateAdmin/StudentCertificate/CertificateTemplateList', [
            'templates' => $templates,
        ]);
    }

    public function uploadCertForm()
    {
        return Inertia::render('2-StateAdmin/StudentCertificate/CertificateTemplateForm');
    }

    public function uploadTemplate(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,jpg,png',
        ]);

        try {
            $path = $request->file('file')->store('cert_templates','public');

            $template = CertificateTemplate::create([
                'name' => $request->name,
                'file_path' => $path,
            ]);

            return redirect()->route('certList')->with('success', 'Templat sijil berjaya disimpan!');
        } catch (\Exception $e) {
            return response()->json(['error' => 'File upload failed.'], 500);
        }
    }

    public function getTemplates()
    {
        $templates = CertificateTemplate::all();
        return response()->json($templates);
    }

    public function getTemplate($id)
    {
        $template = CertificateTemplate::find($id);
        if (!$template) {
            return response()->json(['error' => 'Template not found.'], 404);
        }
        return response()->json($template);
    }

    // Method to update a specific certificate template
    public function updateTemplate(Request $request, $id)
    {
        $template = CertificateTemplate::find($id);
        if (!$template) {
            return response()->json(['error' => 'Template not found.'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'file' => 'sometimes|file|mimes:pdf,jpg,png', // Adjust based on your needs
        ]);

        try {
            if ($request->hasFile('file')) {
                // Delete the old file if it exists
                if ($template->file_path) {
                    Storage::delete($template->file_path);
                }

                $path = $request->file('file')->store('certificates');
                $template->file_path = $path;
            }

            if ($request->has('name')) {
                $template->name = $request->name;
            }

            $template->save();

            return response()->json($template);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Update failed.'], 500);
        }
    }

    public function editTemplate($id)
    {
        $template = CertificateTemplate::find($id);
        if (!$template) {
            return response()->json(['error' => 'Template not found.'], 404);
        }

        return Inertia::render('2-StateAdmin/StudentCertificate/CertificateTemplateEdit', [
            'template' => $template,
        ]);
    }
}
