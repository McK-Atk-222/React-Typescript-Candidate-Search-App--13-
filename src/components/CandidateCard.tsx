import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
// import '../index.css';

type CandidateCardProps = {
  currentCandidate: Candidate;
  addToPotentialList?: (() => void) | null;
  onPotentialList?: boolean | null;
  passCandidate?: ((index: number) => void);
  index?: number;
  removeFromStorage?:
  | ((
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    currentlyPotentialList: boolean | null | undefined,
    login: string | null
  ) => void)
  | null;
};

const CandidateCard = ({
  currentCandidate,
  addToPotentialList,
  onPotentialList,
  passCandidate,
  removeFromStorage,
  index,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate?.login ? (

        <div>
          <div className="card">
            <img src={`${currentCandidate.avatar_url}`} alt={`${currentCandidate.login}`} />
            <h2>{currentCandidate.name} ({currentCandidate.login})</h2>
            <p>
              Location: {currentCandidate.location || "None"}
            </p>
            <p>
              Email: {currentCandidate.email || "None"}
            </p>
            <p>
              Company: {currentCandidate.company || "None"}
            </p>
            <p>
              Bio: {currentCandidate.bio || "None"}
            </p>
          </div>
          <div className="btn-container">
          {onPotentialList ? (
            <button>
              <FaCircleMinus
                style={{ fontSize: '40px', cursor: 'pointer', color: 'red' }}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  removeFromStorage?.(
                    e,
                    onPotentialList,
                    currentCandidate.login
                  )
                }
              />
            </button>
          ) : (
            <>
              <button>
                <FaCircleMinus
                  style={{ fontSize: '50px', cursor: 'pointer', color: 'red' }}
                  onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                    passCandidate(
                      index + 1)
                  }
                />
              </button>
              <button>
                <FaCirclePlus
                  style={{ fontSize: '50px', cursor: 'pointer', color: 'green' }}
                  onClick={() => addToPotentialList?.()}
                />
              </button>
              </>
          )}
           </div>
        </div>
      ) : (
        <h2 style={{ margin: '16px 0' }}>No more candidates are available</h2>
      )}
    </>
  );
};

export default CandidateCard;