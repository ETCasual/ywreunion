import { NextPage } from 'next';
import { ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';

import { ref } from 'firebase/database';
import { useDatabase, useDatabaseObjectData } from 'reactfire';

import React from 'react';

export const RankScreen: NextPage = () => {
  const dbRef = useDatabase();

  const gameRef = ref(dbRef, '/');
  const { status, data } = useDatabaseObjectData<Record<string, boolean>>(gameRef);

  return status === 'success' ? (
    <div className="w-[100vw] h-[100vh] overflow-hidden bg-[#126b98] px-[300px] pt-[100px] ">
      <ResponsiveContainer>
        <BarChart barGap={'10%'} data={[data]}>
          <Bar dataKey={1} fill="#FDD000">
            <LabelList dataKey="1" position="insideTop" fill="#000" />
          </Bar>
          <Bar dataKey={2} fill="#FDD000">
            <LabelList dataKey="2" position="insideTop" fill="#000" />
          </Bar>
          <Bar dataKey={3} fill="#FDD000">
            <LabelList dataKey="3" position="insideTop" fill="#000" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : null;
};
