import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { App } from "./app";

vi.setConfig({ testTimeout: 1000 });

describe("app", () => {
    it("renders", () => {
        expect.assertions(1);

        render(<App />);

        expect(screen.getByText("Hello!")).toBeDefined();
    });
});
