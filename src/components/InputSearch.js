const InputSearch = ({searchTerm, handleChange}) => {
  return (
    <>
      <input
        type="text"
        placeholder="Recherche"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  )
}

export default InputSearch;