import React from 'react';
import { SchoolIcon, WorkReverseIcon } from '../icons';
import { isEmpty } from 'lodash';
import styled from '@mui/material/styles/styled'

import Box from '../Box';
import { FbmUserInfoProps, DescTetx } from '.';

const eduExperienceKeyArr = ['school', 'major', 'eduBackground', 'eduDate'];

const workExperienceKeyArr = ['companyName', 'positionName', 'workDate']

const ExperienceRoot = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: '8px'
});


/**
 * @description: 处理对象 按照固定的顺序返回
 * @return {Array} 
 * @param {*} obj 处理的对象
 * @param {*} keyArr 返回的数组的顺序（规则）
 */
 const sortArr = (obj, keyArr) => {
  return keyArr.map(n => ({ key: n, value: obj[n] })).filter(t => t.value);
}

export const EduExperience: React.FC<{ data: FbmUserInfoProps['eduExperience'] }> = ({ data }) => {

  if (isEmpty(data)) return null;
  
  const dataArr = sortArr(data, eduExperienceKeyArr);
  
  const content = dataArr.map((n, i)=> {
    if (n.key === 'eduDate') {
      const { start, end } = n.value;
      return <DescTetx> { start }至{ end } </DescTetx>
    }
    return <DescTetx> { n.value } { i !== dataArr.length - 1 && '｜' } </DescTetx>
  });

  return (
    <ExperienceRoot>
      <SchoolIcon style={{ marginRight: '12px', fontSize: '20px', color: '#9E9E9E' }} />
      { content }
    </ExperienceRoot>
  )
};

export const WorkExperience: React.FC<{ data: FbmUserInfoProps['workExperience'] }> = ({ data }) => {

  if (isEmpty(data)) return null;

  const dataArr = sortArr(data, workExperienceKeyArr);
  const content = dataArr.map((n, i)=> {
    if (n.value === 'workDate') {
      const { start, end } = n.value;
      return <DescTetx> { start }至{ end } </DescTetx>
    }
    return <DescTetx> { n.value } { i !== dataArr.length - 1 && '｜' } </DescTetx>
  });

  return (
    <ExperienceRoot>
      <WorkReverseIcon style={{ marginRight: '12px', color: '#9E9E9E', fontSize: '20px' }} />
      { content }
    </ExperienceRoot>
  )
};