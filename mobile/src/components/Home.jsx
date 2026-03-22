import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

export const Home = ({ setView }) => {
  return (
    <View style={[globalStyles.glassPanel, globalStyles.flexCenter, { minHeight: 400, paddingVertical: 40 }]}>
      <Text style={[globalStyles.titleText, { fontSize: 36, marginBottom: 20 }]}>
        Benvenuto! / Hoş Geldiniz!
      </Text>
      
      <Text style={[globalStyles.subtitleText, { marginBottom: 40, lineHeight: 28, paddingHorizontal: 10 }]}>
        Bu uygulama ile İtalyancanın temel gramer yapılarını ve en çok kullanılan kelimeleri kolayca öğrenebilir, ardından kendinizi quizler ile test edebilirsiniz.
      </Text>
      
      <View style={{ gap: 15, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity style={[globalStyles.btn, globalStyles.btnPrimary, { width: '80%' }]} onPress={() => setView('grammar')}>
          <Text style={globalStyles.btnText}>Gramer Öğrenmeye Başla</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[globalStyles.btn, globalStyles.btnSecondary, { width: '80%' }]} onPress={() => setView('vocabulary')}>
          <Text style={globalStyles.btnText}>Kelime Dağarcığını Geliştir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
