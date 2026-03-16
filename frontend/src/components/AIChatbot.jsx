import React, { useState } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

export default function AIChatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.post('/api/v1/chat/ask/', { question });
      setAnswer(data.answer);
    } catch (error) {
      setAnswer('Sorry, I couldn\'t answer that right now.');
    }
    setLoading(false);
  };

  return (
    <Card className="shadow-sm pink-card" style={{ position: 'fixed', bottom: 20, right: 20, width: 300, zIndex: 1000 }}>
      <Card.Body>
        <Card.Title className="text-pink">AI Assistant</Card.Title>
        <Form onSubmit={askQuestion}>
          <InputGroup>
            <Form.Control
              placeholder="Ask about services..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button type="submit" variant="pink" disabled={loading}>
              {loading ? '...' : 'Ask'}
            </Button>
          </InputGroup>
        </Form>
        {answer && (
          <div className="mt-3 p-2 bg-light rounded">
            <small>{answer}</small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
