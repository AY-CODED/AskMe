import { useState } from 'react'
import Layout from './components/Layout'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import MainContent from './components/MainContent'
import useDarkMode from './hooks/useDarkMode'

function App() {
  const { isDark, toggle } = useDarkMode();

  return (
    <Layout
      isDark={isDark}
      toggleTheme={toggle}
      leftSidebar={<LeftSidebar />}
      rightSidebar={<RightSidebar />}
    >
      <MainContent />
    </Layout>
  )
}

export default App
