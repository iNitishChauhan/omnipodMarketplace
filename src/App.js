import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InsuletMember from './pages/InsuletMember';
import OmnipodCreatorLogin from './pages/OmnipodCreatorLogin';
import CreatorSignup from './pages/CreatorSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insulet-member-login" element={<InsuletMember />} />
        <Route path="/omnipod-creator-login" element={<OmnipodCreatorLogin />} />
       <Route path="/omnipod-creator-signup" element={<CreatorSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
