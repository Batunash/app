import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { quizData } from '../../data/quizData';
import { globalStyles, colors } from '../../styles/globalStyles';

export const ExamView = ({ onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpenEnded, setIsOpenEnded] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    startNewExam();
  }, []);

  const startNewExam = () => {
    const allQuestions = [];
    Object.values(quizData).forEach(topicArray => {
      allQuestions.push(...topicArray);
    });

    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));

    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setTextInput('');
    setIsOpenEnded(Math.random() < 0.5);
  };

  if (questions.length === 0) {
    return (
      <View style={[globalStyles.glassPanel, globalStyles.flexCenter]}>
        <Text style={globalStyles.subtitleText}>Sınav yükleniyor...</Text>
      </View>
    );
  }

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestionIdx].answer) {
      setScore(score + 1);
    }
  };

  const handleSubmitOpenEnded = () => {
    if (isAnswered || !textInput.trim()) return;
    setIsAnswered(true);
    
    if (textInput.trim().toLowerCase() === questions[currentQuestionIdx].answer.toLowerCase()) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTextInput('');
      setIsOpenEnded(Math.random() < 0.5);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <View style={[globalStyles.glassPanel, globalStyles.flexCenter]}>
        <Text style={[globalStyles.titleText, { fontSize: 32 }]}>Genel Sınav Tamamlandı!</Text>
        <View style={{
          width: 150, height: 150, borderRadius: 75, 
          backgroundColor: colors.accentPurple,
          alignItems: 'center', justifyContent: 'center', marginVertical: 30
        }}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
            {score} / {questions.length}
          </Text>
        </View>
        <Text style={[globalStyles.subtitleText, { marginBottom: 30 }]}>
          Tüm konulardan rastgele seçilen bu sınavı başarıyla tamamladınız.
        </Text>
        <View style={{ gap: 15, width: '100%', alignItems: 'center' }}>
          <TouchableOpacity style={[globalStyles.btn, globalStyles.btnPrimary, { width: '80%' }]} onPress={startNewExam}>
            <Text style={globalStyles.btnText}>Yeni Sınav Başlat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSecondary, { width: '80%' }]} onPress={onBack}>
            <Text style={globalStyles.btnText}>Ana Menüye Dön</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQ = questions[currentQuestionIdx];

  return (
    <View style={globalStyles.glassPanel}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSecondary, { paddingVertical: 8, paddingHorizontal: 15 }]} onPress={onBack}>
          <Text style={globalStyles.btnText}>← Çıkış</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontWeight: 'bold', color: colors.accentPink, fontSize: 16 }}>Genel Sınav Modülü</Text>
          <Text style={{ fontWeight: 'bold', color: colors.textSecondary }}>Soru {currentQuestionIdx + 1} / {questions.length}</Text>
        </View>
      </View>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 25 }}>{currentQ.question}</Text>

      {!isOpenEnded ? (
        <View style={{ gap: 15, marginBottom: 30 }}>
          {currentQ.options.map((option, idx) => {
            let btnStyle = [globalStyles.btn, globalStyles.btnSecondary, { alignItems: 'flex-start', padding: 15 }];
            if (isAnswered) {
              if (option === currentQ.answer) {
                btnStyle.push(globalStyles.btnSuccess);
              } else if (option === selectedOption) {
                btnStyle.push({ backgroundColor: 'rgba(239, 68, 68, 0.8)', borderColor: colors.accentRed });
              }
            }

            return (
              <TouchableOpacity 
                key={idx} 
                style={btnStyle}
                onPress={() => handleOptionClick(option)}
                disabled={isAnswered}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>{String.fromCharCode(65 + idx)}) </Text>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={{ gap: 15, marginBottom: 30 }}>
          <TextInput 
            style={{
              padding: 15, fontSize: 18, borderRadius: 8,
              borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white', width: '100%'
            }}
            placeholder="Cevabınızı buraya yazın..."
            placeholderTextColor={colors.textSecondary}
            value={textInput}
            onChangeText={setTextInput}
            editable={!isAnswered}
            onSubmitEditing={handleSubmitOpenEnded}
            autoFocus
          />
          {!isAnswered && (
            <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSuccess, { opacity: textInput.trim() ? 1 : 0.5 }]} onPress={handleSubmitOpenEnded} disabled={!textInput.trim()}>
              <Text style={globalStyles.btnText}>Cevapla</Text>
            </TouchableOpacity>
          )}
          
          {isAnswered && (
            <View style={{
              marginTop: 15, padding: 15, borderRadius: 8,
              backgroundColor: textInput.trim().toLowerCase() === currentQ.answer.toLowerCase() ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              borderWidth: 1, borderColor: textInput.trim().toLowerCase() === currentQ.answer.toLowerCase() ? '#22c55e' : '#ef4444'
            }}>
              <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 18, color: textInput.trim().toLowerCase() === currentQ.answer.toLowerCase() ? '#4ade80' : '#f87171' }}>
                {textInput.trim().toLowerCase() === currentQ.answer.toLowerCase() ? '✅ Doğru!' : '❌ Yanlış!'}
              </Text>
              {textInput.trim().toLowerCase() !== currentQ.answer.toLowerCase() && (
                <Text style={{ fontSize: 16, color: colors.textPrimary }}>
                  Doğru Cevap: <Text style={{ fontWeight: 'bold', color: '#4ade80' }}>{currentQ.answer}</Text>
                </Text>
              )}
            </View>
          )}
        </View>
      )}

      {isAnswered && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity style={[globalStyles.btn, { paddingHorizontal: 40, paddingVertical: 15 }]} onPress={handleNext}>
            <Text style={[globalStyles.btnText, { fontSize: 18 }]}>
              {currentQuestionIdx + 1 === questions.length ? 'Sonucu Gör' : 'Sıradaki Soru →'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
