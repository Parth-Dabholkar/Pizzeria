export default function CardRight(props) {
  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3 w-100">
          <div className="row g-0 align-items-center">
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title fs-2">{props.title}</h5>
                <p className="card-text fs-5" style={{ textAlign: "justify" }}>{props.content}</p>
              </div>
            </div>
            <div className="col-md-6">
              <img src={props.img} className="img-fluid rounded-end" alt="Imgages" width="650"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
