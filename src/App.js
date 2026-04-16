import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InsuletMember from './pages/InsuletMember';
import OmnipodCreatorLogin from './pages/OmnipodCreatorLogin';
import CreatorSignup from './pages/CreatorSignup';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import CreatorProfile from './pages/CreatorProfile';
import ContentGuidelines from './pages/ContentGuidelines';
import SocialMediaPolicy from './pages/SocialMediaPolicy';
import Notifications from './pages/Notifications';
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
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<CreatorProfile />} />
        <Route path="/content-guidelines" element={<ContentGuidelines />} />
        <Route path="/social-media-policy" element={<SocialMediaPolicy />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
