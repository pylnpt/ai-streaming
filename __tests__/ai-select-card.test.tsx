import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For matchers like `toBeInTheDocument`
import { AIFilterSelectCard } from "@/app/(dashboard)/u/[username]/aifilter/_components/ai-fillter-select.-card";

describe("AIFilterSelectCard component", () => {
  const baseProps = {
    everyFilter: [
      {
        id: "1",
        label: "Identity Attack",
        value: "identity_attack",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "2",
        label: "Insult",
        value: "insult",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "3",
        label: "Obscene content",
        value: "obscene",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "4",
        label: "Severe Toxicity",
        value: "severe_toxicity",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "5",
        label: "Sexual Explicit",
        value: "sexual_explicit",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "6",
        label: "Threat",
        value: "threat",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "7",
        label: "Toxicity",
        value: "toxicity",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
    ],
    activeFilters: [
      {
        id: "7",
        label: "Toxicity",
        value: "toxicity",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
    ],
    user: {
      id: "user123",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-02"),
      username: "testuser",
      imageUrl: "https://example.com/profile.jpg",
      externalUserId: "external123",
      bio: "This is a test user.",
      aiThresholdId: null,
      isUsingProfanityFilter: true,
    },
  };

  it("renders selected filters", () => {
    render(<AIFilterSelectCard {...baseProps} />);
    const selectedFilter = screen.getByText("Toxicity");
    expect(selectedFilter).toBeInTheDocument();
  });
});