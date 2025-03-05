import type React from 'react';
import { useEffect, useState } from 'react';
import CandidatesToPotentialList from '../components/CandidatesSaved';
import type Candidate from '../interfaces/Candidate.interface';
import '../index.css';

const SavedCandidates = () => {

  const [candidatesToPotential, setCandidatesToPotential] = useState<Candidate[]>([]);

  const removeFromStorage = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> ,
    currentlyOnPotentialList: boolean | null | undefined,
    login: string | null
  ) => {
    e.preventDefault();
    if (currentlyOnPotentialList) {
      let parsedCandidatesToPotential: Candidate[] = [];

      const storedCandidatesToPotential = localStorage.getItem('CandidatesToPotential');
      if (typeof storedCandidatesToPotential === 'string') {
        parsedCandidatesToPotential = JSON.parse(storedCandidatesToPotential);
      }
      parsedCandidatesToPotential = parsedCandidatesToPotential.filter(
        (candidate) => candidate.login !== login
      );
      setCandidatesToPotential(parsedCandidatesToPotential);
      localStorage.setItem('CandidatesToPotential', JSON.stringify(parsedCandidatesToPotential));
    }
  };

  useEffect(() => {
    const parsedCandidatesToPotential = JSON.parse(
      localStorage.getItem('CandidatesToPotential') as string
    );
    setCandidatesToPotential(parsedCandidatesToPotential);
  }, []);

  return (
    <>
    <h1>Potential Candidates</h1>
      {(!candidatesToPotential?.length || candidatesToPotential?.length === 0) ? (
        <h2 style={{ margin: '16px 0' }}>No candidates have been accepted</h2>
      ) : (
        <table className='table'>
        <CandidatesToPotentialList
          candidatesToPotential={candidatesToPotential}
          removeFromStorage={removeFromStorage}
        />
        </table>
      )}
    </>
  );
};

export default SavedCandidates;
