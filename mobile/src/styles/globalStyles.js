import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const colors = {
  bgPrimary: '#0f172a',
  bgSecondary: '#1e293b',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  accentBlue: '#3b82f6',
  accentPurple: '#8b5cf6',
  accentPink: '#ec4899',
  accentGreen: '#10b981',
  accentRed: '#ef4444',
  accentOrange: '#f59e0b',
  glassBg: 'rgba(30, 41, 59, 0.6)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassBgHover: 'rgba(255, 255, 255, 0.1)',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  contentContainer: {
    padding: 20,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: 40,
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  titleText: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  glassPanel: {
    backgroundColor: colors.glassBg,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.37,
    shadowRadius: 32,
    elevation: 5,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  btnPrimary: {
    backgroundColor: colors.accentBlue, // We will use LinearGradient later if possible, or fallback to solid
  },
  btnSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
  },
  btnSuccess: {
    backgroundColor: colors.accentGreen,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  navTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: colors.glassBg,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    margin: 5,
  },
  navTabActive: {
    backgroundColor: colors.accentPink, // Fallback for gradient
    borderColor: 'transparent',
  },
  navTabText: {
    color: colors.textPrimary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  navTabTextActive: {
    color: 'white',
  },
  markdownBody: {
    body: { color: colors.textPrimary, fontSize: 16, lineHeight: 24 },
    heading2: { color: colors.textPrimary, fontSize: 28, fontWeight: '800', marginVertical: 10 },
    heading3: { color: colors.accentPink, fontSize: 24, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: colors.glassBorder, paddingBottom: 5, marginVertical: 10, marginTop: 25 },
    paragraph: { marginBottom: 15 },
    strong: { fontWeight: 'bold', color: 'white' },
    blockquote: { borderLeftWidth: 4, borderLeftColor: colors.accentBlue, backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: 10, marginVertical: 15, borderRadius: 5 },
    table: { borderColor: colors.glassBorder, borderWidth: 1, borderRadius: 8, marginVertical: 15 },
    th: { borderColor: colors.glassBorder, borderWidth: 1, padding: 10, backgroundColor: 'rgba(255,255,255,0.05)' },
    td: { borderColor: colors.glassBorder, borderWidth: 1, padding: 10 },
    list_item: { marginBottom: 5 },
  }
});
