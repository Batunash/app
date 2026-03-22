import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../../styles/globalStyles';

export const Navbar = ({ currentView, setView }) => {
  return (
    <View style={globalStyles.navTabs}>
      <TouchableOpacity 
        style={[globalStyles.navTab, currentView === 'home' && globalStyles.navTabActive]}
        onPress={() => setView('home')}
      >
        <Text style={[globalStyles.navTabText, currentView === 'home' && globalStyles.navTabTextActive]}>Anasayfa (Home)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[globalStyles.navTab, currentView === 'grammar' && globalStyles.navTabActive]}
        onPress={() => setView('grammar')}
      >
        <Text style={[globalStyles.navTabText, currentView === 'grammar' && globalStyles.navTabTextActive]}>Gramer (Grammatica)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[globalStyles.navTab, currentView === 'vocabulary' && globalStyles.navTabActive]}
        onPress={() => setView('vocabulary')}
      >
        <Text style={[globalStyles.navTabText, currentView === 'vocabulary' && globalStyles.navTabTextActive]}>Kelime (Vocabolario)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[globalStyles.navTab, currentView === 'exam' && globalStyles.navTabActive]}
        onPress={() => setView('exam')}
      >
        <Text style={[globalStyles.navTabText, currentView === 'exam' && globalStyles.navTabTextActive]}>Genel Sınav (Esame)</Text>
      </TouchableOpacity>
    </View>
  );
};
