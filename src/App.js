import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InsuletMember from './pages/InsuletMember';
import OmnipodCreatorLogin from './pages/OmnipodCreatorLogin';
import CreatorSignup from './pages/CreatorSignup';
import Dashboard from './pages/Dashboard';
import ContentGuidelines from './pages/ContentGuidelines';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insulet-member-login" element={<InsuletMember />} />
        <Route path="/omnipod-creator-login" element={<OmnipodCreatorLogin />} />
        <Route path="/omnipod-creator-signup" element={<CreatorSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/content-guidelines" element={<ContentGuidelines />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
