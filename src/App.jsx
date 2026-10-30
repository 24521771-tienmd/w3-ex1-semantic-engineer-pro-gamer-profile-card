
import { DeveloperCard } from './components/DeveloperCard';

function App() {
  return (
    <main>
      <h1>Lab 03 — React 19</h1>

      <DeveloperCard
        fullName="Tran Vinh Khiem"
        role="Senior Systems Architect • UIT S3T"
        //avatarUrl="https://www.researchgate.net/profile/Khiem-Tran-7"
        avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240"
      />
    </main>
  );
}

export default App;