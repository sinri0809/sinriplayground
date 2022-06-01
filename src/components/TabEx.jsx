/**
 * Material UI 수정하는 연습 
 */
import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import 'style/fixmaterialui.scss';

import { alpha, styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// * 컴포넌트 재 정의 
const StyledTabs = styled(Tabs)(({ theme }) => ({
  width: "100%",
  color: theme.palette.success.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}));


const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },

  // style overrides
  MuiButton: {
    styleOverrides: {
      // Name of the slot
      root: {
        // Some CSS
        fontSize: '12rem',
      },
    },
  },

  // sx 로 바로 접근하기
  // MuiChip: {
  //   styleOverrides: {
  //     root: sx({
  //       px: 1,
  //       py: 0.25,
  //       borderRadius: 1,
  //     }),
  //     label: {
  //       padding: 'initial',
  //     },
  //     icon: sx({
  //       mr: 0.5,
  //       ml: '-2px',
  //     }),
  //   },
  // },
});


const TabEx = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, value) => {
    setTabValue(value);
  }

  return (<div className='practice'>
    <h2>Fix Material UI</h2>

    <StyledTabs
      value={tabValue}
      onChange={handleChange}
      aria-label="wrapped label tabs example"
    >
      <Tab
        value={0}
        label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
        wrapped
        sx={{
          color: "white",
          '&.Mui-selected': {
            color: 'blue',
          },
          '& .MuiTouchRipple-root': {
            color: 'black',
            backgroundColor: 'transparent'
          }
        }}
      />
      <Tab theme={theme} value={1} label="Item Two" />
      <Tab value={2} label="Item Three" />
    </StyledTabs>

    <div>
      {tabValue === 0 && <div>0번째 콘텐츠</div>}
      {tabValue === 1 && <div>1번째 콘텐츠</div>}
      {tabValue === 2 && <div>2번째 콘텐츠</div>}
    </div>
  </div>)
}

export default TabEx;