import React from 'react';
import { ref, set, increment as rtdbIncrement } from 'firebase/database';
import { useDatabase, useDatabaseObjectData } from 'reactfire';

const rep = {
  1: [
    {
      repName: 'LF - TBC',
      index: 1,
    },
    {
      repName: 'PK - Cloud',
      index: 2,
    },
    {
      repName: 'TM - TBC',
      index: 3,
    },
    {
      repName: 'KL - Mei Shi',
      index: 4,
    },
  ],
  2: [
    {
      repName: 'LF - Zhi Ling',
      index: 1,
    },
    {
      repName: 'PK - Judy',
      index: 2,
    },
    {
      repName: 'TM - TBC',
      index: 3,
    },
    {
      repName: 'KL - Xin Kai',
      index: 4,
    },
  ],
};

export const VoteScreen = () => {
  const dbRef = useDatabase();

  const gameRef = ref(dbRef, '/');

  const { status, data } = useDatabaseObjectData<Record<string, any>>(gameRef);

  const increment = (amountToIncrement: number, index) => {
    return set(ref(dbRef, `/${data['currentLevel']}/${index}`), rtdbIncrement(amountToIncrement));
  };

  const submitted =
    typeof window !== 'undefined'
      ? localStorage.getItem('submitted') !== null
        ? JSON.parse(localStorage.getItem('submitted'))
        : localStorage.setItem('submitted', JSON.stringify({ 1: false }))
      : null;

  const toSubmit = () => {
    submitted[data['currentLevel']] = true;
    localStorage.setItem('submitted', JSON.stringify(submitted));
  };

  return status === 'success' && typeof window !== 'undefined' ? (
    <>
      {!submitted[data['currentLevel']] ? (
        <div className="grid grid-cols-1 gap-5 w-full h-[100vh] bg-[#F4F4F4] p-5">
          {rep[data['currentLevel']].map((r) => (
            <button
              className="flex items-center justify-center w-full h-full rounded-xl bg-[#FDD800] disabled:bg-[#FDF100]"
              key={r.index}
              onClick={() => {
                increment(1, r.index);
                toSubmit();
              }}
            >
              <p className="font-bold font-serif lg:text-2xl sm:text-xl text-lg">
                Vote for {r.repName}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full h-[100vh] flex justify-center items-center font-extrabold font-serif">
          You have already voted for this round! 😊
        </div>
      )}
    </>
  ) : null;
};
