// toolController.js

const Tool = require('../schema/tool');
const AI = require('../schema/AIModel');

exports.addTool = async (req, res) => {
  try {
    const { toolTitle, category,pricingPrice,pricingType, toolDescription, visitLink, firebaseImageUrl } = req.body;
    const newTool = new Tool({ toolTitle, category, pricingPrice, pricingType, toolDescription, visitLink, firebaseImageUrl });
    console.log("",newTool);
    await newTool.save();
    res.status(201).json(newTool);
  } catch (error) {
    console.error('Error adding tool:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAI = async (req, res) => {
  try {
    const tools = await AI.find().maxTimeMS(300000);
    res.json(tools);
    console.log(AI.collection.name);

    console.log(tools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateAIStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedAI = await AI.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedAI);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateFilter = async (req, res) => {
  try {
    const { id } = req.params;
    const { newFilterValue } = req.body;
    const ai = await AI.findById(id);
    if (!ai) {
      return res.status(404).json({ message: 'AI tool not found' });
    }
    ai.filter = newFilterValue;
    await ai.save();
    res.status(200).json({ message: 'Filter value updated successfully', updatedAI: ai });
  } catch (error) {
    console.error('Error updating filter value:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const { toolId } = req.params;
    const deletedTool = await Tool.findByIdAndDelete(toolId);
    if (!deletedTool) {
      return res.status(404).json({ success: false, message: 'Tool not found' });
    }
    res.status(200).json({ success: true, message: 'Tool deleted successfully' });
  } catch (error) {
    console.error('Error deleting tool:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateToolData = async (req, res) => {
  try {
    const { toolId } = req.params;
    const { toolTitle, category,pricingPrice,pricingType, toolDescription, visitLink, firebaseImageUrl } = req.body;
    const updatedTool = await Tool.findByIdAndUpdate(toolId, {
      toolTitle,
      category,
      pricingType,
      pricingPrice,
      toolDescription,
      visitLink,
      firebaseImageUrl
    }, { new: true });
    if (!updatedTool) {
      return res.status(404).json({ success: false, message: 'Tool not found' });
    }
    res.status(200).json({ success: true, data: updatedTool });
  } catch (error) {
    console.error('Error updating tool data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
