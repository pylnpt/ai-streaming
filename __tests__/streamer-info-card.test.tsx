import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For matchers like `toBeInTheDocument`
import { StreamerInfoCard } from "@/components/stream-player/streamer-info-card";

describe("StreamerInfoCard component", () => {
  const baseProps = {
    hostName: "Streamer123",
    hostIdentity: "streamer123",
    viewerIdentity: "viewer456",
    bio: "This is a test bio for the streamer.",
    followedByNum: 100,
  };

  it("renders the host's name", () => {
    render(<StreamerInfoCard {...baseProps} />);
    expect(screen.getByText("About Streamer123")).toBeInTheDocument();
  });

  it("renders the verified badge", () => {
    render(<StreamerInfoCard {...baseProps} />);
    expect(screen.getByText("Verified")).toBeInTheDocument(); // Assuming VerifiedBadge renders "Verified"
  });

  it("renders the follower count with correct label", () => {
    render(<StreamerInfoCard {...baseProps} />);
    expect(screen.getByText("100 followers")).toBeInTheDocument();
  });

  it("renders 'follower' label for a single follower", () => {
    render(<StreamerInfoCard {...baseProps} followedByNum={1} />);
    expect(screen.getByText("1 follower")).toBeInTheDocument();
  });

  it("renders the bio", () => {
    render(<StreamerInfoCard {...baseProps} />);
    expect(screen.getByText("This is a test bio for the streamer.")).toBeInTheDocument();
  });

  it("renders a fallback bio if no bio is provided", () => {
    render(<StreamerInfoCard {...baseProps} bio="" />);
    expect(
      screen.getByText(
        "Thousands upon thousands might be revealed, yet there would always be more that remained hidden. Such as this Users bio. Sad honestly."
      )
    ).toBeInTheDocument();
  });

  it("renders the BioModal if the viewer is the host", () => {
    render(
      <StreamerInfoCard
        {...baseProps}
        viewerIdentity="host-streamer123" // Viewer is the host
      />
    );
    expect(screen.getByText("Edit Bio")).toBeInTheDocument(); // Assuming BioModal renders "Edit Bio"
  });

  it("does not render the BioModal if the viewer is not the host", () => {
    render(<StreamerInfoCard {...baseProps} />);
    expect(screen.queryByText("Edit Bio")).not.toBeInTheDocument();
  });

  it("renders the correct follower count for zero followers", () => {
    render(<StreamerInfoCard {...baseProps} followedByNum={0} />);
    expect(screen.getByText("0 followers")).toBeInTheDocument();
  });

  it("renders the component with proper structure", () => {
    const { container } = render(<StreamerInfoCard {...baseProps} />);
    expect(container.firstChild).toHaveClass("px-4");
    expect(container.querySelector(".group")).toBeInTheDocument();
    expect(container.querySelector(".border-primary")).toBeInTheDocument();
  });
});