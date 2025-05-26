import { useLocation } from "react-router-dom";
import { useState } from "react";

const VerifyEmail = () => {
  const location = useLocation();
  // Get email from state passed via navigation, fallback to 'your email'
  const email = location.state?.email || "your email";

  // Optional: disable resend since currentUser is null (user not signed in)
  const [resendDisabled, setResendDisabled] = useState(true);

  // You can remove or hide resendEmail button since it won't work without currentUser
  // If you want to keep it, show a message or disable it.

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center">
          <h4 className="mb-3 fw-bold text-primary">Verify Your Email</h4>
          <p className="text-muted">
            A verification link has been sent to{" "}
            <strong>{email}</strong>. Please check your inbox and click the
            link to verify.
          </p>

          <button
            className="btn btn-outline-primary mt-3 w-100"
            type="button"
            disabled={resendDisabled}
            onClick={() => alert("Please log in to resend verification email")}
          >
            Resend Verification Email
          </button>
          {resendDisabled && (
            <p className="text-muted mt-2">
              To resend, please log in first after verifying your email.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;


