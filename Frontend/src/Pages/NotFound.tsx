
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-9xl font-extrabold text-[#8B4513] opacity-20">404</h1>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h2>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                    <Button asChild style={{ backgroundColor: '#8B4513' }} className="rounded-full px-8 py-6 text-lg shadow-xl">
                        <Link to="/">Go Back Home</Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
