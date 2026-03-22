import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { globalStyles, colors } from '../../styles/globalStyles';

export const LessonView = ({ topic, type, onBack, onQuiz }) => {
  const [viewMode, setViewMode] = useState('list');
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  if (!topic) return null;

  let flashcards = [];
  if (type === 'vocabulary' && topic.content) {
    const lines = topic.content.split('\n');
    lines.forEach(line => {
      const match = line.match(/-\s*\*\*(.+?):\*\*\s*(.+)/);
      if (match) {
        flashcards.push({ front: match[1].trim(), back: match[2].trim() });
      }
    });
  }

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  const nextCard = () => {
    if (isFlipped) {
      flipAnim.setValue(0);
      setIsFlipped(false);
    }
    if (cardIdx + 1 < flashcards.length) setCardIdx(cardIdx + 1);
  };

  const prevCard = () => {
    if (isFlipped) {
      flipAnim.setValue(0);
      setIsFlipped(false);
    }
    if (cardIdx > 0) setCardIdx(cardIdx - 1);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }], position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backfaceVisibility: 'hidden', opacity: isFlipped ? 1 : 0 };

  return (
    <View style={[globalStyles.glassPanel, { flex: 1 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSecondary]} onPress={onBack}>
          <Text style={globalStyles.btnText}>← Geri Dön</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSuccess]} onPress={onQuiz}>
          <Text style={globalStyles.btnText}>Quiz'e Başla →</Text>
        </TouchableOpacity>
      </View>

      <Text style={[globalStyles.titleText, { fontSize: 32, marginBottom: 15 }]}>{topic.title}</Text>
      
      {type === 'vocabulary' && flashcards.length > 0 && (
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <TouchableOpacity 
            style={[globalStyles.btn, viewMode === 'list' ? globalStyles.btnSuccess : globalStyles.btnSecondary, { flex: 1 }]} 
            onPress={() => setViewMode('list')}
          >
            <Text style={[globalStyles.btnText, { fontSize: 14 }]}>Liste Görünümü</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[globalStyles.btn, viewMode === 'flashcard' ? globalStyles.btnSuccess : globalStyles.btnSecondary, { flex: 1 }]} 
            onPress={() => setViewMode('flashcard')}
          >
            <Text style={[globalStyles.btnText, { fontSize: 14 }]}>Flashcards</Text>
          </TouchableOpacity>
        </View>
      )}

      {viewMode === 'list' || type !== 'vocabulary' ? (
        <ScrollView style={{ marginTop: 10 }}>
          <Markdown style={globalStyles.markdownBody}>
            {topic.content}
          </Markdown>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', marginBottom: 15, color: colors.textSecondary }}>
            Kart {cardIdx + 1} / {flashcards.length}
          </Text>
          
          <TouchableOpacity onPress={flipCard} activeOpacity={0.9} style={{ width: '100%', alignItems: 'center' }}>
            {/* Front Card */}
            <Animated.View style={[
              frontAnimatedStyle, 
              { 
                width: '90%', height: 300, 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                borderColor: colors.glassBorder, borderWidth: 1, borderRadius: 12,
                alignItems: 'center', justifyContent: 'center', padding: 30,
                backfaceVisibility: 'hidden',
                display: isFlipped ? 'none' : 'flex'
              }
            ]}>
              <Text style={{ fontSize: 36, fontWeight: 'bold', color: colors.textPrimary, textAlign: 'center' }}>
                {flashcards[cardIdx].front}
              </Text>
            </Animated.View>
            
            {/* Back Card */}
            <Animated.View style={[
              backAnimatedStyle, 
              { 
                width: '90%', height: 300, 
                backgroundColor: 'rgba(56, 189, 248, 0.15)', 
                borderColor: colors.accentBlue, borderWidth: 2, borderRadius: 12,
                alignItems: 'center', justifyContent: 'center', padding: 30,
                backfaceVisibility: 'hidden',
                display: !isFlipped ? 'none' : 'flex'
              }
            ]}>
              <Text style={{ fontSize: 36, fontWeight: 'bold', color: colors.textPrimary, textAlign: 'center' }}>
                {flashcards[cardIdx].back}
              </Text>
            </Animated.View>

          </TouchableOpacity>
          
          <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 14, color: colors.textSecondary }}>Çevirmek için karta tıklayın</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 30 }}>
            <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSecondary]} onPress={prevCard} disabled={cardIdx === 0}>
              <Text style={[globalStyles.btnText, { opacity: cardIdx === 0 ? 0.5 : 1 }]}>Önceki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSecondary]} onPress={nextCard} disabled={cardIdx === flashcards.length - 1}>
              <Text style={[globalStyles.btnText, { opacity: cardIdx === flashcards.length - 1 ? 0.5 : 1 }]}>Sonraki</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
