import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { FaCircleMinus } from "react-icons/fa6";


interface CandidatesToPotentialProps {
  candidatesToPotential: Candidate[];
  removeFromStorage:
  | ((
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    currentlyOnPotentialList: boolean | null | undefined,
    login: string | null
  ) => void)
  | null;
}

const CandidatesToPotentialList = ({
  candidatesToPotential,
  removeFromStorage,
}: CandidatesToPotentialProps) => {
  console.log(candidatesToPotential);

  return (
    <>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Location</th>
        <th>Email</th>
        <th>Company</th>
        <th>Bio</th>
        <th>Reject</th>
      </tr>
      <tbody>
      {candidatesToPotential.map((candidate) => {
        return (
          <tr>
            <td>
              <img src={candidate.avatar_url} className="avatar" />
            </td>
            <td>
              <p>{candidate.name || "No name provided"}</p>
              <p>({candidate.login})</p>
            </td>
            <td>{candidate.location || "No location provided"}</td>
            <td>{candidate.email || "No email provided"}</td>
            <td>{candidate.company || "No company provided"}</td>
            <td>{candidate.bio || "No bio provided"}</td>
            <td>
              <button className='btn-container'>
                 <FaCircleMinus
                    style={{ fontSize: '40px', cursor: 'pointer', color: 'red' }}
                      onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                        removeFromStorage?.(
                          e,
                          true,
                         candidate.login
                      )
                     }
                  />
               </button>
            </td>
          </tr>
        )
      })}
      </tbody>
    </>
  );
};

export default CandidatesToPotentialList;
