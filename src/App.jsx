import { useState } from 'react';
import Layout from './components/Layout';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import MainContent from './components/MainContent';ss
import useDarkMode from './hooks/useDarkMode';
// Fixed: Importing the correct Cohere function
import { sendMessageToCohere } from './services/cohere';

function App() {
  const { isDark, toggle } = useDarkMode();
  
  const [currentPage, setCurrentPage] = useState('AI Chat');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text, attachment) => {
    const userMsg = { role: 'user', content: text, attachment };
    setMessages(prev => [...prev, userMsg]);
    
    setIsLoading(true);

    try {
      // Fixed: calling the Cohere service function
      const responseText = await sendMessageToCohere(text, messages);

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I am having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      isDark={isDark}
      toggleTheme={toggle}
      leftSidebar={
        <LeftSidebar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
        />
      }
      rightSidebar={<RightSidebar />}
    >
      {currentPage === 'Projects' ? (
        <Projects />
      ) : (
        <MainContent 
          onSendMessage={handleSendMessage} 
          messages={messages} 
          isLoading={isLoading} 
        />
      )}
    </Layout>
  );
}

export default App;