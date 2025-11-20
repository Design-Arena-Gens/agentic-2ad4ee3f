import Navbar from '@/components/Navbar';
import MoodBoard from '@/components/MoodBoard';
import Storyboard from '@/components/Storyboard';
import ShotList from '@/components/ShotList';
import BriefEditor from '@/components/BriefEditor';
import ColorPalette from '@/components/ColorPalette';
import TypographyBoard from '@/components/TypographyBoard';

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-padded py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 card p-5">
            <h2 className="section-title">Mood Board</h2>
            <MoodBoard />
          </section>

          <section className="card p-5">
            <h2 className="section-title">Creative Brief</h2>
            <BriefEditor />
          </section>

          <section className="card p-5">
            <h2 className="section-title">Storyboard</h2>
            <Storyboard />
          </section>

          <section className="card p-5">
            <h2 className="section-title">Shot List</h2>
            <ShotList />
          </section>

          <section className="card p-5">
            <h2 className="section-title">Color Palette</h2>
            <ColorPalette />
          </section>

          <section className="card p-5">
            <h2 className="section-title">Typography</h2>
            <TypographyBoard />
          </section>
        </div>
      </main>
    </div>
  );
}
