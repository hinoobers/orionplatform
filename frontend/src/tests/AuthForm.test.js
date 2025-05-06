import LoginForm from "../components/UI/auth/LoginForm"
import RegisterForm from "../components/UI/auth/RegisterForm"
import {render, screen} from "@testing-library/react";

describe("Authentication Forms", () => {
    it("renders LoginForm", () => {
        render(<LoginForm />);
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    it("renders RegisterForm", () => {
        render(<RegisterForm />);
        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });
});