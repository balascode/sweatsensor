import React from 'react';
import { Box, Card, CardContent, Container, Typography, Fade, useTheme } from '@mui/material';

const FAQSection = () => {
  const theme = useTheme();
  const faqs = [
    {
      question: "How accurate is SweatSense for glucose monitoring?",
      answer: "SweatSense provides glucose readings with 98% accuracy compared to traditional blood glucose monitors. While not a replacement for medical devices in critical situations, it offers reliable continuous monitoring for daily management."
    },
    {
      question: "Is the device comfortable to wear during exercise?",
      answer: "Yes, the SweatSense device is designed to be lightweight and waterproof, with a flexible adhesive that stays secure during intense physical activity without causing skin irritation."
    },
    {
      question: "How long does the battery last?",
      answer: "The SweatSense device has a battery life of up to 7 days with continuous use. Recharging takes approximately 1 hour using the included magnetic charging dock."
    },
    {
      question: "Can SweatSense detect dehydration?",
      answer: "Yes, SweatSense measures electrolyte concentrations and sweat rate to provide accurate hydration status updates and can alert you when you're approaching dehydration thresholds."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. All SweatSense data is encrypted end-to-end and stored securely. We never share your health data with third parties without your explicit consent."
    }
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: theme.palette.background.default }} id="faq">
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', letterSpacing: 2 }}>
            FAQ
          </Typography>
          <Typography variant="h3" sx={{
            fontWeight: 'bold',
            mb: 2,
            background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Frequently Asked Questions
          </Typography>
        </Box>
        <Box>
          {faqs.map((faq, index) => (
            <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }} key={index}>
              <Card sx={{
                mb: 3,
                borderRadius: 4,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(0,204,255,0.15)'
                  : '0 4px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`,
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{faq.question}</Typography>
                  <Typography variant="body1" color="text.secondary">{faq.answer}</Typography>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;