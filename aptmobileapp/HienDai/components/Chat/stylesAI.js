import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Đổi lại, để chatbox và input sát đáy
    paddingTop: 32,
    paddingBottom: 0, // Không padding dưới
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2563eb',
  },
  chatbox: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    padding: 16,
    marginBottom: 16,
    flexDirection: 'column',
    flex: 1, // <-- Thêm dòng này để chatbox chiếm hết chiều cao còn lại
    minHeight: 0, // Đảm bảo không bị lỗi flex
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: '#2563eb',
    shadowColor: '#93c5fd',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  sendBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#93c5fd',
  },
  clearBtn: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#FF3232',
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
     marginBottom: 16, // Thêm khoảng cách dưới nút Clear
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: 'bold',

  }, messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#f3f4f6',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-start',
  },
  userLabel: {
    fontWeight: 'bold',
    color: '#6b7280',
    marginRight: 6,
  },
  messageText: {
    color: '#222',
    fontSize: 16,
    flexShrink: 1,
  },
});