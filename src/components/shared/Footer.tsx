import Link from "next/link";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Aasim <span className="text-primary-400">Resume</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Build professional, ATS-friendly resumes in minutes. Powered by modern
              templates and AI suggestions to help you land your dream job.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              A product of{" "}
              <a href="https://technobites.tech" className="text-primary-400 hover:text-primary-300" target="_blank" rel="noopener noreferrer">
                technobites.tech
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/builder" className="hover:text-white transition-colors">Resume Builder</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">&copy; 2024 Aasim Resume Builder. All rights reserved.</p>
          <p className="text-xs text-gray-500">Built with care by technobites.tech</p>
        </div>
      </div>
    </footer>
  );
}
