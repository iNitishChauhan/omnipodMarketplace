import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../components/URLS";

function DocusignCallback() {
  const [message, setMessage] = useState("Verifying your DocuSign agreement...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const agreementId = params.get("agreement_id");
    const token = localStorage.getItem("token");

    const verify = async () => {
      if (!agreementId || !token) {
        setMessage("The agreement could not be verified. Return to the upload window and try again.");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}docusign/agreements/${agreementId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const agreement = response.data.agreement;
        window.opener?.postMessage(
          {
            type: "docusign-callback",
            agreementId: agreement.id,
            status: agreement.status,
            signed: agreement.signed,
          },
          window.location.origin
        );
        setMessage(
          agreement.signed
            ? "Agreement signed and verified. This window will close."
            : `DocuSign status: ${agreement.status}. You may close this window.`
        );
        window.setTimeout(() => window.close(), 1500);
      } catch (error) {
        setMessage(error.response?.data?.message || "Unable to verify the agreement. Return to the upload window and try again.");
      }
    };

    verify();
  }, []);

  return (
    <main className="docusign-callback">
      <h1>DocuSign</h1>
      <p>{message}</p>
    </main>
  );
}

export default DocusignCallback;
