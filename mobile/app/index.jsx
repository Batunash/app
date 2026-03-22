import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Navbar } from '../src/components/layout/Navbar';
import { Home } from '../src/components/Home';
import { LessonView } from '../src/components/lessons/LessonView';
import { QuizView } from '../src/components/quiz/QuizView';
import { ExamView } from '../src/components/quiz/ExamView';
import { grammarData } from '../src/data/grammarData';
import { vocabularyData } from '../src/data/vocabularyData';
import { globalStyles, colors } from '../src/styles/globalStyles';

export default function App() {
  const [currentView, setView] = useState('home');
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [activeTopicType, setActiveTopicType] = useState(null);

  const navigate = (view) => {
    setView(view);
    if(view === 'home' || view === 'grammar' || view === 'vocabulary') {
      setActiveTopicId(null);
    }
  };

  const startQuiz = (topicId, type) => {
    setActiveTopicId(topicId);
    setActiveTopicType(type);
    setView('quiz');
  };

  const openLesson = (topicId, type) => {
    setActiveTopicId(topicId);
    setActiveTopicType(type);
    setView('lesson');
  };

  const renderContent = () => {
    if (currentView === 'home') return <Home setView={navigate} />;
    if (currentView === 'grammar') {
      return (
        <View style={globalStyles.contentContainer}>
          {grammarData.map(topic => (
            <View key={topic.id} style={globalStyles.glassPanel}>
              <Text style={globalStyles.titleText}>{topic.title}</Text>
              <Text style={{color: colors.textSecondary, marginBottom: 15}}>{topic.description}</Text>
              <View style={{gap: 10}}>
                <TouchableOpacity style={[globalStyles.btn, globalStyles.btnPrimary]} onPress={() => openLesson(topic.id, 'grammar')}>
                  <Text style={globalStyles.btnText}>Dersi Oku</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSuccess]} onPress={() => startQuiz(topic.id, 'grammar')}>
                  <Text style={globalStyles.btnText}>Quiz'e Başla</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    }
    if (currentView === 'vocabulary') {
      return (
        <View style={globalStyles.contentContainer}>
          {vocabularyData.map(topic => (
            <View key={topic.id} style={globalStyles.glassPanel}>
              <Text style={globalStyles.titleText}>{topic.title}</Text>
              <View style={{gap: 10, marginTop: 15}}>
                <TouchableOpacity style={[globalStyles.btn, globalStyles.btnPrimary]} onPress={() => openLesson(topic.id, 'vocabulary')}>
                  <Text style={globalStyles.btnText}>Kelimeleri Çalış</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSuccess]} onPress={() => startQuiz(topic.id, 'vocabulary')}>
                  <Text style={globalStyles.btnText}>Quiz'e Başla</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    }
    if (currentView === 'lesson') {
      const data = activeTopicType === 'grammar' ? grammarData : vocabularyData;
      const topic = data.find(t => t.id === activeTopicId);
      return <LessonView topic={topic} type={activeTopicType} onBack={() => navigate(activeTopicType)} onQuiz={() => startQuiz(topic.id, activeTopicType)} />;
    }
    if (currentView === 'quiz') {
      const data = activeTopicType === 'grammar' ? grammarData : vocabularyData;
      const topic = data.find(t => t.id === activeTopicId);
      return <QuizView topic={topic} onBack={() => navigate(activeTopicType)} onLesson={() => openLesson(topic.id, activeTopicType)} />;
    }
    if (currentView === 'exam') {
      return <ExamView onBack={() => navigate('home')} />;
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[globalStyles.header, {marginTop: 20}]}>
          <Text style={[globalStyles.titleText, {fontSize: 32}]}>Impara L'Italiano</Text>
          <Text style={globalStyles.subtitleText}>İtalyanca Öğrenme ve Test Uygulaması</Text>
        </View>
        
        {currentView !== 'lesson' && currentView !== 'quiz' && currentView !== 'exam' && (
          <Navbar currentView={currentView} setView={navigate} />
        )}

        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
