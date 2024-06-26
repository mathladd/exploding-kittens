import Footer from './Footer';
import Header from './Header';

export default function BaseLayout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Header />
      <div className="w-full h-full flex-1 bg-slate-900">{children}</div>
      <Footer />
    </>
  );
}
