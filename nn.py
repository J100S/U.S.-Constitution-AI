import numpy as np
import re
import os


def load_constitution_from_file():
    """Load the full Constitution from the Constitution.txt file"""
    constitution_file = os.path.join(os.path.dirname(__file__), "Constitution.txt")
    
    try:
        with open(constitution_file, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Constitution file not found. Using embedded version."


# Load Constitution from file
CONSTITUTION_TEXT = load_constitution_from_file()

# Extract key sections for structured access
CONSTITUTION = {
    "full_text": CONSTITUTION_TEXT,
}


class NeuralNetwork:
    def __init__(self, layer_sizes):
        """
        Initialize neural network with given layer sizes.
        
        Args:
            layer_sizes: List of integers representing neurons in each layer
                        e.g., [3, 4, 1] for 3 input, 4 hidden, 1 output
        """
        self.layers = len(layer_sizes)
        self.weights = []
        
        # Initialize weights randomly
        for i in range(len(layer_sizes) - 1):
            w = 2 * np.random.random((layer_sizes[i], layer_sizes[i+1])) - 1
            self.weights.append(w)
    
    def sigmoid(self, x):
        """Sigmoid activation function"""
        return 1 / (1 + np.exp(-x))
    
    def sigmoid_derivative(self, x):
        """Derivative of sigmoid function"""
        return x * (1 - x)
    
    def forward(self, X):
        """Forward propagation"""
        self.activations = [X]
        for w in self.weights:
            X = self.sigmoid(np.dot(X, w))
            self.activations.append(X)
        return X
    
    def backward(self, y, learning_rate=1.0):
        """Backward propagation with gradient descent"""
        deltas = []
        error = y - self.activations[-1]
        delta = error * self.sigmoid_derivative(self.activations[-1])
        deltas.append(delta)
        
        # Backpropagate error
        for i in range(len(self.weights) - 1, 0, -1):
            delta = deltas[0].dot(self.weights[i].T) * self.sigmoid_derivative(self.activations[i])
            deltas.insert(0, delta)
        
        # Update weights
        for i in range(len(self.weights)):
            self.weights[i] += self.activations[i].T.dot(deltas[i]) * learning_rate
    
    def train(self, X, y, epochs=60000, learning_rate=1.0):
        """Train the neural network"""
        for epoch in range(epochs):
            output = self.forward(X)
            self.backward(y, learning_rate)
            
            if (epoch + 1) % 10000 == 0:
                loss = np.mean((y - output) ** 2)
                print(f"Epoch {epoch + 1}/{epochs}, Loss: {loss:.6f}")
    
    def predict(self, X):
        """Make predictions"""
        return self.forward(X)


def extract_text_features(text):
    """Extract features from Constitution text for neural network input"""
    if not text:
        return np.array([0, 0, 0, 0])
    
    text_lower = text.lower()
    
    # Simple features: word counts for key constitutional concepts
    features = [
        text_lower.count("people"),
        text_lower.count("right"),
        text_lower.count("power"),
        text_lower.count("state"),
    ]
    
    # Normalize to 0-1 range
    total_words = max(len(text_lower.split()), 1)
    features = [f / total_words for f in features]
    
    return np.array(features)


def split_into_sections(text):
    """Split Constitution text into logical sections"""
    sections = []
    
    # Split by Article and Amendment markers
    lines = text.split('\n')
    current_section = ""
    current_title = "Preamble"
    
    for line in lines:
        line_stripped = line.strip()
        
        if not line_stripped:
            if current_section:
                current_section += "\n"
            continue
        
        # Check for Article or Amendment markers
        if line_stripped.startswith("Article"):
            # Save previous section
            if current_section.strip():
                sections.append({
                    "name": current_title,
                    "text": current_section.strip(),
                    "features": extract_text_features(current_section)
                })
            current_title = line_stripped
            current_section = ""
        elif line_stripped.startswith("Amendment"):
            # Save previous section
            if current_section.strip():
                sections.append({
                    "name": current_title,
                    "text": current_section.strip(),
                    "features": extract_text_features(current_section)
                })
            current_title = line_stripped
            current_section = ""
        elif line_stripped.startswith("SECTION"):
            # Update title to include section
            current_title = current_title + " - " + line_stripped
            current_section += " " + line_stripped
        elif line_stripped.startswith("PART"):
            current_title = current_title + " - " + line_stripped
            current_section += " " + line_stripped
        else:
            current_section += " " + line_stripped
    
    # Add the last section
    if current_section.strip():
        sections.append({
            "name": current_title,
            "text": current_section.strip(),
            "features": extract_text_features(current_section)
        })
    
    return sections if sections else [{
        "name": "Full Constitution",
        "text": text,
        "features": extract_text_features(text)
    }]


def analyze_constitution():
    """Analyze Constitution sections using the neural network"""
    print("=" * 60)
    print("U.S. Constitution Neural Network Analysis")
    print("=" * 60)
    
    sections = split_into_sections(CONSTITUTION_TEXT)
    
    print(f"\nTotal sections found: {len(sections)}")
    print("-" * 60)
    
    for i, section in enumerate(sections[:20], 1):  # Show first 20 sections
        print(f"{i}. {section['name']}")
        print(f"   Features: People({section['features'][0]:.3f}), Rights({section['features'][1]:.3f}), "
              f"Power({section['features'][2]:.3f}), States({section['features'][3]:.3f})")
        print(f"   Text length: {len(section['text'])} characters")
        print()


# Example usage
if __name__ == "__main__":
    # XOR problem dataset
    X = np.array([[0,0,1], [0,1,1], [1,0,1], [1,1,1]])
    y = np.array([[0,1,1,0]]).T
    
    # Create and train network
    print("Training Neural Network on XOR Problem...")
    nn = NeuralNetwork([3, 4, 1])
    nn.train(X, y, epochs=60000, learning_rate=1.0)
    
    print("\nXOR Predictions:")
    predictions = nn.predict(X)
    print(predictions)
    
    # Analyze Constitution
    analyze_constitution()
