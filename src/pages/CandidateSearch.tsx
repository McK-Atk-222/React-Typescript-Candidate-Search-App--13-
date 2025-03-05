import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
      login: '',
      avatar_url: '',
      name: '',
      location: '',
      company: '',
      email: '',
      bio: '',
  });


  const [candidates, setCandidates] = useState<Candidate[]>([])

  const [index, setIndex] = useState(0)

  const addToPotentialList = () => {
    let parsedCandidatesToList: Candidate[] = [];
    const storedCandidatesToList = localStorage.getItem('CandidatesToPotential');
    if (typeof storedCandidatesToList === 'string') {
      parsedCandidatesToList = JSON.parse(storedCandidatesToList);
    }
    parsedCandidatesToList.push(currentCandidate);
    localStorage.setItem('CandidatesToPotential', JSON.stringify(parsedCandidatesToList));
    setIndex(index+1)
  };


  useEffect(() => {
    async function getUsers () {
      const data = await searchGithub();
      setCandidates(data)
    }
    getUsers()
  }, [])


  useEffect(() => {
    async function getSingleUser() {
      const data = await searchGithubUser(candidates[index].login);
      setCurrentCandidate(data)
    }
    getSingleUser()
  }, [candidates, index])

  return (
    <>
    <h1>Candidate Search</h1>
      <CandidateCard
        currentCandidate={currentCandidate}
        addToPotentialList={addToPotentialList}
        passCandidate={setIndex}
        index={index}
      />

    </>
  );
};

export default CandidateSearch;