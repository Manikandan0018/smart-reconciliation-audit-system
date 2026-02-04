import styled from "styled-components";

export default function ReconciliationCard({
  title,
  value,
  description,
  accent = "#4f46e5",
}) {
  return (
    <StyledWrapper accent={accent}>
      <div className="parent">
        <div className="card">
          <div className="content-box">
            <span className="card-title">{title}</span>
            <p className="card-value">{value}</p>
            <p className="card-content">{description}</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .parent {
    width: 100%;
    perspective: 1400px; /* MORE depth */
  }

  .card {
    position: relative;
    height: 220px;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    transform-style: preserve-3d;
    transition:
      transform 0.2s ease-out,
      box-shadow 0.25s ease;
    box-shadow: 0 18px 30px -12px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    will-change: transform;
  }

  .card:hover {
    transform: rotateX(12deg) rotateY(-18deg);
    box-shadow: 0 40px 60px -20px rgba(0, 0, 0, 0.35);
  }

  .content-box {
    position: relative;
    height: 100%;
    padding: 28px;
    border-radius: 14px;
    background: linear-gradient(
      135deg,
      ${({ accent }) => accent}18,
      ${({ accent }) => accent}05
    );
    transform-style: preserve-3d;
  }

  /* LIGHT SHINE (IMPORTANT FOR DEPTH) */
  .content-box::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.35),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .card:hover .content-box::after {
    opacity: 1;
  }

  .card-title {
    display: block;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #475569;
    transform: translateZ(45px);
  }

  .card-value {
    font-size: 36px;
    font-weight: 800;
    margin: 12px 0;
    color: #0f172a;
    transform: translateZ(70px); /* BIG depth */
  }

  .card-content {
    font-size: 13px;
    color: #64748b;
    line-height: 1.45;
    transform: translateZ(40px);
  }
`;
