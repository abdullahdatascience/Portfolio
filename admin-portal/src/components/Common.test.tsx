import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Field, SaveBtn, CancelBtn, EditBtn, DeleteBtn, LoadingDots, EmptyState } from "./Common";

describe("Common admin UI primitives", () => {
  it("renders a field with its label associated for accessibility", () => {
    render(
      <Field label="Skill Name">
        <input data-testid="input" aria-label="Skill Name" />
      </Field>
    );
    expect(screen.getByText("Skill Name")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("SaveBtn fires its callback", () => {
    const onClick = jest.fn();
    render(<SaveBtn onClick={onClick} label="Save Changes" />);
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("CancelBtn, EditBtn and DeleteBtn fire their callbacks", () => {
    const cancel = jest.fn();
    const edit = jest.fn();
    const del = jest.fn();
    render(
      <div>
        <CancelBtn onClick={cancel} />
        <EditBtn onClick={edit} />
        <DeleteBtn onClick={del} />
      </div>
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(edit).toHaveBeenCalledTimes(1);
    expect(del).toHaveBeenCalledTimes(1);
  });

  it("LoadingDots exposes a status role for screen readers", () => {
    render(<LoadingDots />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("EmptyState renders its title and optional description", () => {
    render(<EmptyState title="No skills yet." description="Add your first skill." />);
    expect(screen.getByText("No skills yet.")).toBeInTheDocument();
    expect(screen.getByText("Add your first skill.")).toBeInTheDocument();
  });
});